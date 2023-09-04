require 'sinatra'
require 'mongo'
require 'json'
require 'bcrypt'

# Configurar a conexão com o servidor MongoDB
client = Mongo::Client.new('mongodb+srv://admin:adminadmin@cluster0.lcxcczi.mongodb.net/tex')
users_collection = client[:users]

# Configurar o CORS para permitir requisições da sua aplicação React Native
before do
  response.headers['Access-Control-Allow-Origin'] = '*' # Substitua pelo domínio correto da sua aplicação
  response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
end

set :bind, '0.0.0.0'
set :port, 4567

get '/users' do
  content_type :json
  users = users_collection.find.to_a
  users.to_json
end

# Rota para receber os dados do formulário de registro em JSON
post '/users' do
  request.body.rewind
  data = JSON.parse(request.body.read)

  name = data['name']
  email = data['email']
  cpf = data['cpf']
  password = data['password']
  confirmPassword = data['confirmPassword']

  # Criptografar a senha usando BCrypt
  hashed_password = BCrypt::Password.create(password)

  doc_to_insert = {
    name: name,
    email: email,
    cpf: cpf,
    password: hashed_password, # Use a senha criptografada aqui
    confirmPassword: confirmPassword
  }

  result = users_collection.insert_one(doc_to_insert)

  if result.n == 1
    status 201 # Created
    content_type :json
    { message: "Usuário registrado com sucesso" }.to_json
  else
    status 500 # Internal Server Error
    content_type :json
    { message: "Erro ao registrar usuário" }.to_json
  end
end

# Fechar a conexão com o cliente após as operações
at_exit do
  client.close
end
