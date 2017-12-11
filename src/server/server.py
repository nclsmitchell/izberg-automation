import os
from flask import Flask, render_template, send_from_directory, make_response, send_file, request
from flask_restful import Resource, Api

from scripts import export_resource
from scripts import update_resource
from scripts import compare_settings

app = Flask(__name__, template_folder='../../build', static_folder='../../build/static')
api = Api(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('', path)

@app.route('/api/download/<path:path>')
def download_file(path):
    try:
        return send_file(os.getcwd() + '/src/server/files/%s.csv' % path, attachment_filename='%s.csv' % path)
    except Exception as e:
        print(e)

class ErrorExporter(Resource):

    def get(self):
        transformation_log_id = request.args.get('id', None)
        export_resource.ErrorExporter().run(transformation_log_id)

        filename = 'transformation_log_%s.csv' % transformation_log_id
        path = os.getcwd() + '/src/server/files/' + filename

        with open(path) as fp:
            csv = fp.read()

        response = make_response(csv)
        response.headers['Access-Control-Allow-Origin'] = '*'

        return response

api.add_resource(ErrorExporter, '/api/transformation_log/')


class ChannelExporter(Resource):

    def get(self):
        channel_id = request.args.get('id', None)
        merchant_id = request.args.get('merchant_id', None)
        export_resource.ChannelExporter().run(channel_id, merchant_id)

        if merchant_id is not None:
            filename = 'merchant_%s_items.csv' % merchant_id
        else:
            filename = 'channel_item_%s.csv' % channel_id

        path = os.getcwd() + '/src/server/files/' + filename

        with open(path) as fp:
            csv = fp.read()

        response = make_response(csv)
        response.headers['Access-Control-Allow-Origin'] = '*'

        return response

api.add_resource(ChannelExporter, '/api/channel_item/')


class MerchantExporter(Resource):

    def get(self):
        application_id = request.args.get('id', None)
        export_resource.MerchantExporter().run(application_id)

        filename = 'application_merchant_%s.csv' % application_id
        path = os.getcwd() + '/src/server/files/' + filename

        with open(path) as fp:
            csv = fp.read()

        response = make_response(csv)
        response.headers['Access-Control-Allow-Origin'] = '*'

        return response

api.add_resource(MerchantExporter, '/api/application_merchant/')


class HipayMerchantExporter(Resource):

    def get(self):
        application_id = request.args.get('id', None)
        hipay_username = request.args.get('hipay_username', None)
        hipay_password = request.args.get('hipay_password', None)
        export_resource.HipayMerchantExporter().run(application_id, hipay_username, hipay_password)

        filename = 'hipay_merchant_%s.csv' % application_id
        path = os.getcwd() + '/src/server/files/' + filename

        with open(path) as fp:
            csv = fp.read()

        response = make_response(csv)
        response.headers['Access-Control-Allow-Origin'] = '*'

        return response

api.add_resource(HipayMerchantExporter, '/api/hipay_merchant/')


class ImageMigration(Resource):

    def get(self):
        channel_id = request.args.get('id', None)
        update_resource.ImageMigration().run(channel_id)

        filename = 'image_migration_%s.csv' % channel_id
        path = os.getcwd() + '/src/server/files/' + filename

        with open(path) as fp:
            csv = fp.read()

        response = make_response(csv)
        response.headers['Access-Control-Allow-Origin'] = '*'

        return response

api.add_resource(ImageMigration, '/api/image_migration/')


class SettingComparison(Resource):

    def get(self):
        prod_id = request.args.get('prod_id', None)
        sand_id = request.args.get('sand_id', None)

        response = make_response(compare_settings.SettingExporter().run(prod_id, sand_id))
        response.headers['Access-Control-Allow-Origin'] = '*'

        return response

api.add_resource(SettingComparison, '/api/setting_comparison/')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
