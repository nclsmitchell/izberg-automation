# coding: utf-8
import requests
from requests import HTTPError
import wget

from algoliasearch import algoliasearch
from slugify import slugify

import csv
import os
import base64


class BaseExporter(object):

    TOKEN = os.environ.get('IZBERG_TOKEN')

    def get(self, url):
        headers = {'Authorization': self.TOKEN}
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        return res.json()

    def fromtimestamp(self, timestamp):
        return datetime.datetime.fromtimestamp(timestamp).strftime('%Y-%m-%dT%H:%M:%S')

    def get_value(self, item, fieldname):
        parent_attr = ''

        for attr in fieldname.split('.'):

            if item is not None:

                if attr == 'timestamp':
                    try:
                        item = fromtimestamp(item.get(attr))
                    except Exception as e:
                        print "%s: %s" % (attr, e)

                if parent_attr == 'application_categories_dict':
                    try:
                        item = item[len(item)-1].get(attr)
                    except IndexError:
                        item = ''
                    except Exception as e:
                        import pdb; pdb.set_trace()
                else:
                    try:
                        item = item.get(attr)
                    except AttributeError:
                        try:
                            item = item[0].get(attr)
                        except Exception as e:
                            print "%s: %s" % (attr, e)
            else:
                item = ''

            parent_attr = attr

        return item


class ErrorExporter(BaseExporter):

    def format_data(self, item, fieldnames):
        line = {}

        for fieldname in fieldnames:
            try:
                line[fieldname] = self.get_value(item, fieldname).encode('utf-8')
            except AttributeError:
                line[fieldname] = self.get_value(item, fieldname)

            if item.get('error_code_verbose') == 'Category not found':
                line['error_detail'] = item.get('item').get('application_category_external_ids')
            if item.get('error_code_verbose') == 'Product not found':
                line['error_detail'] = item.get('item').get('gtin')
            if item.get('error_code_verbose') == 'Image download error':
                line['error_detail'] = item.get('item').get('primary_image')

        return line

    def run(self, transformation_log_id):

        if not transformation_log_id:
            raise Exception("You must at least provide a transformation_log ID")

        print "Exporting errors for Transformation log ID %s" % transformation_log_id

        def get_errors(transformation_log_id):
            url = 'https://api.iceberg.technology/v1/mapper_transformation_log_detail/?transformation_log={id}&limit=100'.format(
                id=transformation_log_id
            )
            page = self.get(url)

            for error in page.get('objects'):
                yield error

            while page.get('meta').get('next') is not None:
                url = page.get('meta').get('next')
                page = self.get(url)
                for error in page.get('objects'):
                    yield error

        filename = 'transformation_log_%s.csv' % transformation_log_id
        path = os.getcwd() + '/src/server/files/' + filename

        fieldnames = ['id', 'kind', 'item_identifier_value', 'error_code_verbose', 'error_detail']

        writer = csv.DictWriter(open(path, 'wb'), fieldnames=fieldnames)
        writer.writeheader()

        errors = get_errors(transformation_log_id)
        count = 0

        for error in errors:
            line = self.format_data(error, fieldnames)

            count += 1
            if count % 100 == 0:
                print "%s" % (count)

            try:
                writer.writerow(line)
            except Exception as e:
                print e


class ChannelExporter(BaseExporter):

    def format_data(self, item, fieldnames):
        line = {}

        for fieldname in fieldnames:
            try:
                line[fieldname] = self.get_value(item, fieldname).encode('utf-8')
            except AttributeError:
                line[fieldname] = self.get_value(item, fieldname)

        return line

    def run(self, channel_id):

        if not channel_id:
            raise Exception("You must at least provide a channel ID")

        print "Exporting items for Channel ID %s" % channel_id

        def get_channel(channel_id):
            url = 'https://api.iceberg.technology/v1/product_channel/{id}/'.format(
                id=channel_id
            )
            return self.get(url)

        channel = get_channel(channel_id)

        client = algoliasearch.Client(channel.get('algolia_application_id'), channel.get('algolia_api_key'))
        index = client.init_index(channel.get('algolia_index_name'))
        iterator = index.browse_all({'hitsPerPage': 1000, 'facetFilters': ['status:active'] })

        filename = 'channel_item_%s.csv' % channel_id
        path = os.getcwd() + '/src/server/files/' + filename

        fieldnames = ['product.gtin', 'product.name', 'product.description', 'product.application_categories_dict.external_id', 'product.brand.name', 'product.default_image', 'product.language', 'product.keywords', 'product.package_weight', 'product.item_width', 'product.item_length', 'product.item_height',
        'sku', 'price', 'previous_price_without_vat', 'stock', 'condition', 'merchant.id', 'shipping_cost_override_value', 'attributes.global_shipping_delays',
        'variations'
        ]

        writer = csv.DictWriter(open(path, 'wb'), fieldnames=fieldnames)
        writer.writeheader()

        count = 0

        for item in iterator:
            line = self.format_data(item, fieldnames)

            count += 1
            if count % 1000 == 0:
                print count

            if count % 100000 == 0:
                break

            try:
                writer.writerow(line)
            except:
                import pdb; pdb.set_trace()


class MerchantExporter(BaseExporter):

    def get_groups(self, merchant_id):
        url = 'https://api.iceberg.technology/v1/merchant/{merchant}/groups'.format(
            merchant=merchant_id
        )
        return self.get(url)['objects']

    def format_data(self, item, fieldnames):
        line = {}

        for fieldname in fieldnames:
            try:
                line[fieldname] = self.get_value(item, fieldname).encode('utf-8')
            except AttributeError:
                line[fieldname] = self.get_value(item, fieldname)

        merchant_groups = self.get_groups(item.get('id'))
        line['international_group_keys'] = []
        line['generic_group_keys'] = []

        for group in merchant_groups:
            if group.get('group_type') == 'international':
                line['international_group_keys'].append(group.get('group_key'))
            else:
                line['generic_group_keys'].append(group.get('group_key'))

        line['international_group_keys'] = ','.join(line['international_group_keys'])
        line['generic_group_keys'] = ','.join(line['generic_group_keys'])

        return line

    def run(self, application_id):

        if not application_id:
            raise Exception("You must at least provide an application ID")

        print "Exporting merchants for Application ID %s" % application_id

        def get_merchants(application_id):
            url = 'https://api.iceberg.technology/v1/merchant/?application={id}&status__in=10,20,30&limit=100'.format(
                id=application_id
            )
            page = self.get(url)
            for merchant in page.get('objects'):
                yield merchant

            while page.get('meta').get('next') is not None:
                url = page.get('meta').get('next')
                page = self.get(url)
                for merchant in page.get('objects'):
                    yield merchant

        filename = 'application_merchant_%s.csv' % application_id
        path = os.getcwd() + '/src/server/files/' + filename

        fieldnames = ['name', 'external_id', 'addresses.contact_email', 'addresses.contact_first_name', 'addresses.contact_last_name', 'addresses.phone', 'addresses.zipcode', 'addresses.city', 'addresses.address', 'addresses.address2', 'addresses.country.name', 'prefered_language', 'default_currency', 'description', 'long_description', 'url', 'international_group_keys', 'generic_group_keys']

        writer = csv.DictWriter(open(path, 'wb'), fieldnames=fieldnames)
        writer.writeheader()

        merchants = get_merchants(application_id)
        count = 0

        for merchant in merchants:
            line = self.format_data(merchant, fieldnames)

            count += 1
            if count % 10 == 0:
                print count

            try:
                writer.writerow(line)
            except:
                import pdb; pdb.set_trace()


class HipayMerchantExporter(BaseExporter):

    def format_data(self, item, fieldnames):
        line = {}

        for fieldname in fieldnames:
            try:
                line[fieldname_with_item] = self.get_value(item, fieldname).encode('utf-8')
            except AttributeError:
                line[fieldname_with_item] = self.get_value(item, fieldname)

        return line

    def run(self, application_id, hipay_username, hipay_password):

        if not application_id:
            raise Exception("You must at least provide an application ID")
        if not hipay_username:
            raise Exception("You must at least provide an Hipay username")
        if not hipay_password:
            raise Exception("You must at least provide an Hipay password")

        def get_hipay_merchants(application_id):
            url = 'https://api.iceberg.technology/v1/hipay_merchant_account/?merchant__application={id}&only=merchant,owner_display_name,user_account_id&limit=0'.format(
                id=application_id
            )
            return self.get(url)['objects']

        def get_active_merchants(application_id):
            url = 'https://api.iceberg.technology/v1/merchant/?application={id}&status__in=10,20,30&only=id,name&limit=0'.format(
                id=application_id
            )
            return self.get(url)['objects']

        def get_hipay_documents(account_id):
            url = 'https://merchant.hipaywallet.com/api/identification.json'
            headers = {'php-auth-subaccount-id': str(account_id), 'Authorization': 'Basic ' + base64.b64encode(hipay_username + ':' + hipay_password)}
            res = requests.get(url, headers=headers)
            return res.json()

        filename = 'hipay_merchant_%s.csv' % application_id
        path = os.getcwd() + '/src/server/files/' + filename

        fieldnames = ['id', 'name', 'user_account_id', 'identification_status', 'document.label', 'document.type', 'document.status_label', 'document.status_code',]
        writer = csv.DictWriter(open(path, 'wb'), fieldnames=fieldnames)
        writer.writeheader()

        active_merchants = get_active_merchants(application_id)
        MERCHANT_DICT = {v.get('merchant').get('id'): v for v in get_hipay_merchants(application_id)}

        count = 0

        for merchant in active_merchants:
            if merchant.get('id') in MERCHANT_DICT.keys():
                documents = get_hipay_documents(MERCHANT_DICT.get(merchant.get('id')).get('user_account_id'))

                line = {
                    'id': merchant.get('id'),
                    'name': merchant.get('name').encode('utf-8'),
                    'user_account_id': MERCHANT_DICT.get(merchant.get('id')).get('user_account_id'),
                    'identification_status': documents.get('identification_status')
                }
                try:
                    writer.writerow(line)
                except:
                    import pdb; pdb.set_trace()

                if documents.get('identification_status') == 'Unidentified':
                    for document in documents.get('documents'):
                        line = {
                            'id': merchant.get('id'),
                            'name': merchant.get('name').encode('utf-8'),
                            'document.label': document.get('label'),
                            'document.type': document.get('type'),
                            'document.status_label': document.get('status_label'),
                            'document.status_code': document.get('status_code')
                        }
                        try:
                            writer.writerow(line)
                        except:
                            import pdb; pdb.set_trace()

            else:
                line = {
                    'id': merchant.get('id'),
                    'name': merchant.get('name').encode('utf-8'),
                    'identification_status': 'No Hipay account'
                }
                try:
                    writer.writerow(line)
                except:
                    import pdb; pdb.set_trace()

            count += 1
            if count % 10 == 0:
                print count
