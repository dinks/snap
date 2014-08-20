JsRoutes.setup do |config|
  config.default_url_options = { format: :json }
  config.namespace = 'SnapRoutes'
  config.include =  [
                      /^api.*/
                    ]
end
