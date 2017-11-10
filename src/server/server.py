import os
from flask import Flask, render_template, send_from_directory, make_response, send_file, request
from flask_restful import Resource, Api

from scripts import export_resource

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
		return e

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

api.add_resource(ErrorExporter, '/api/transformation_log/export/')


class ChannelExporter(Resource):

    def get(self):
        channel_id = request.args.get('id', None)
        export_resource.ChannelExporter().run(channel_id)

        filename = 'channel_item_%s.csv' % channel_id
        path = os.getcwd() + '/src/server/files/' + filename

        with open(path) as fp:
            csv = fp.read()

        response = make_response(csv)
        response.headers['Access-Control-Allow-Origin'] = '*'

        return response

api.add_resource(ChannelExporter, '/api/channel_item/export/')


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

api.add_resource(MerchantExporter, '/api/application_merchant/export/')

if __name__ == '__main__':
    app.run(host='192.168.103.62', port=5000)
