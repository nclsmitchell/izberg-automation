# coding: utf-8
import requests
from requests import HTTPError
from collections import OrderedDict
from datadiff import diff

import json
import os

class BaseComparator(object):

    SAND_TOKEN = os.environ.get('SAND_TOKEN')
    PROD_TOKEN = os.environ.get('PROD_TOKEN')

    def get(self, url, token):
        headers = {'Authorization': token}
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        return res.json()


class SettingExporter(BaseComparator):

    def run(self, prod_id, sand_id):

        def get_settings(application_id, env=''):
            url = 'http://api.{env}iceberg.technology/v1/application_configuration/?application={app}&limit=0'.format(
                env=env, app=application_id
            )
            if env == '':
                token = self.PROD_TOKEN
            else:
                token = self.SAND_TOKEN
            return self.get(url, token).get('objects')[0].get('settings')

        def extract_settings(settings):

            data = {}

            for setting in settings:
                payload = {
                    "status": setting.get('status'),
                    "read_permission": setting.get('read_permission'),
                    "write_permission": setting.get('write_permission'),
                    "value": setting.get('value')
                }
                data[setting.get('key')] = payload

            return OrderedDict(sorted(data.items()))

        prod_settings = get_settings(prod_id)
        prod_data = extract_settings(prod_settings)

        sand_settings = get_settings(sand_id, 'sandbox.')
        sand_data = extract_settings(sand_settings)

        dif = {}

        for k, v in prod_data.items():

            dif[k] = {
                'production': '',
                'sandbox': '',
                'equal': True
            }

            if k in sand_data.keys():
                diffs = diff(prod_data.get(k), sand_data.get(k)).diffs

                for d in diffs:
                    if d[0] == 'delete':
                        dif[k]['production'] += str(d[1][0])
                        dif[k]['equal'] = False
                    elif d[0] == 'insert':
                        dif[k]['sandbox'] += str(d[1][0])
                        dif[k]['equal'] = False

        return json.dumps(dif)
