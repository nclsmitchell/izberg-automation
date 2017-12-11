# coding: utf-8
import requests
from requests import HTTPError
from algoliasearch import algoliasearch

import os
import json
import csv


class BaseUpdater(object):

    TOKEN = os.environ.get('IZBERG_TOKEN')

    def get(self, url):
        headers = {'Authorization': self.TOKEN}
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        return res.json()

    def post(self, url, payload):
        headers = {'Authorization': self.TOKEN}
        res = requests.post(url, headers=headers, data=json.dumps(payload))
        res.raise_for_status()
        return res.json()

    def patch(self, url, payload):
        headers = {'Authorization': self.TOKEN}
        res = requests.patch(url, headers=headers, data=json.dumps(payload))
        res.raise_for_status()
        return res.json()

    def delete(self, url):
        headers = {'Authorization': self.TOKEN}
        res = requests.delete(url, headers=headers)
        res.raise_for_status()
        return res.status_code

    def get_data(self, item, fieldnames):
        line = {
            "id": None,
            "payload": {}
        }

        for fieldname in fieldnames:
            if 'payload' in fieldname.split('.') and len(fieldname.split('.')) > 1:
                try:
                    key = fieldname.split('.')[1]
                    line['payload'][key] = item.get(fieldname)
                except Exception as e:
                    print("%s: %s" % (fieldname, e))
            elif 'id' in fieldname.split('.'):
                try:
                    line['id'] = item.get(fieldname)
                except Exception as e:
                    print("%s: %s" % (fieldname, e))
            else:
                continue
        return line


class ImageMigration(BaseUpdater):

    def run(self, channel_id):

        if not channel_id:
            raise Exception("You must at least provide a channel ID")

        def get_channel(channel_id):
            url = 'https://api.iceberg.technology/v1/product_channel/{id}/'.format(
                id=channel_id
            )
            return self.get(url)

        def update_field(offer_id, fieldname, value):
            url = 'https://api.iceberg.technology/v1/productoffer/{id}/'.format(
                id=offer_id
            )
            payload = {fieldname: value}
            return self.patch(url, payload)

        def create_image(image_url, merchant_url):
            url = 'https://api.iceberg.technology/v1/image/'
            payload = {'url': image_url, 'merchant': merchant_url}
            return self.post(url, payload)

        def assign_image(offer_id, order, image_id):
            url = 'https://api.iceberg.technology/v1/productoffer/{id}/assign_image/'.format(
                id=offer_id
            )
            payload = {'order': order, 'image_id': image_id}
            return self.post(url, payload)

        def retrieve_image(image_url, merchant_id):
            url = 'https://api.iceberg.technology/v1/image/?merchant={id}&limit=0'.format(
                id=merchant_id
            )
            page = self.get(url)

            for image in page.get('objects'):
                if image_url == image.get('url'):
                    return image.get('id')
                else:
                    continue

            while page.get('meta').get('next') is not None:
                url = page.get('meta').get('next')
                page = self.get(url)
                for image in page.get('objects'):
                    if image_url == image.get('url'):
                        return image.get('id')
                    else:
                        continue

        channel = get_channel(channel_id)

        filename = 'image_migration_%s.csv' % channel_id
        path = os.getcwd() + '/src/server/files/' + filename

        writer = csv.writer(open(path, 'w'), delimiter=',',
            quotechar='"', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['offer_id', 'image_url', 'error_msg'])

        client = algoliasearch.Client(channel.get('algolia_application_id'), channel.get('algolia_api_key'))
        index = client.init_index(channel.get('algolia_index_name'))
        iterator = index.browse_all({'hitsPerPage': 1000})

        count = 0

        for offer in iterator:

            offer_id = offer.get('id')
            merchant_id = offer.get('merchant').get('id')

            if offer.get('assigned_images') is None:
                continue
            if len(offer.get('assigned_images')) == 0 and len(offer.get('images')) > 0:
                for i, image in enumerate(offer.get('images')):
                    image_url = image.get('url')
                    try:
                        created_image = create_image(image_url, merchant_id)
                        assign_image(offer_id, i, created_image.get('id'))
                    except HTTPError as e:
                        error = e.response.json().get('errors')[0]
                        if type(error) == type(dict()):
                            if error.get('field') == 'url':
                                print('retrieving merchant %s images...' % merchant_id)
                                image_id = retrieve_image(image_url, merchant_id)
                                try:
                                    assign_image(offer_id, i, image_id)
                                except HTTPError as e:
                                    line = [
                                        offer_id,
                                        image_url,
                                        error.get('msg')[0].encode('utf-8')
                                    ]
                                    writer.writerow(line)
                        else:
                            line = [
                                offer_id,
                                image_url,
                                error
                            ]
                            writer.writerow(line)
                    except Exception as e:
                        print(e)
                        line = [
                            offer_id,
                            image_url,
                            'Unknown error'
                        ]
                        writer.writerow(line)

                count += 1
                if count % 10 == 0:
                    print(count)
