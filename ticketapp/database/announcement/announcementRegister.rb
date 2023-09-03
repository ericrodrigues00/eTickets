# app.rb

require 'sinatra'
require 'mongo'
require 'json'

# Configurar a conexão com o servidor MongoDB
client = Mongo::Client.new('mongodb+srv://admin:adminadmin@cluster0.lcxcczi.mongodb.net/tex')
announcements_collection = client[:announcements]

# Configurar o CORS para permitir requisições da sua aplicação React Native
before do
  response.headers['Access-Control-Allow-Origin'] = '*' # Substitua pelo domínio correto da sua aplicação
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
end

set :bind, '0.0.0.0'
set :port, 4567

# Rota para buscar os dados dos anúncios em formato JSON
get '/announcements' do
  content_type :json
  announcements = announcements_collection.find.to_a
  announcements.to_json
end

# Rota para adicionar um novo anúncio
post '/register/announcements' do
  request.body.rewind
  data = JSON.parse(request.body.read)

  title = data['title']
  price = data['price']
  type = data['type']
  quantity = data['quantity']
  status = data['status']
  createdAt = Time.now

  doc_to_insert = {
    title: title,
    price: price,
    type: type,
    quantity: quantity,
    status: status,
    createdAt: createdAt
  }

  result = announcements_collection.insert_one(doc_to_insert)

  if result.n == 1
    status 201 # Created
    { message: "Anúncio registrado com sucesso" }.to_json
  else
    status 500 # Internal Server Error
    { message: "Erro ao registrar anúncio" }.to_json
  end
end

# Fechar a conexão com o cliente após as operações
at_exit do
  client.close
end

# Iniciar o servidor Sinatra

