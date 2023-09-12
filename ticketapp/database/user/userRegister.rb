require 'sinatra'
require 'mongo'
require 'json'
require 'bcrypt'

# Configurar a conexão com o servidor MongoDB
client = Mongo::Client.new('mongodb+srv://admin:adminadmin@cluster0.lcxcczi.mongodb.net/tex')
users_collection = client[:users]
announcements_collection = client[:announcements]
# Configurar o CORS para permitir requisições da sua aplicação React Native
before do
  response.headers['Access-Control-Allow-Origin'] = '*' # Substitua pelo domínio correto da sua aplicação
  response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
end

set :bind, '0.0.0.0'
set :port, 4568

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
    confirmPassword: confirmPassword,
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

get '/users/:id/announcement_count' do
  user_id = params[:id]
  puts "ID recebido na rota: #{user_id}"

  # Verifique se o ID está no formato esperado de BSON::ObjectId
  if BSON::ObjectId.legal?(user_id) && BSON::ObjectId(user_id).to_s == user_id
    user = users_collection.find({ _id: BSON::ObjectId(user_id) }).first

    if user
      # Consulte a contagem de anúncios associados a este usuário (assumindo que há um campo que liga anúncios a usuários)
      announcement_count = announcements_collection.count({ user_id: BSON::ObjectId(user_id) })
      # Retorne a contagem de anúncios como uma resposta JSON
      content_type :json
      { announcement_count: announcement_count }.to_json
    else
      status 404 # Usuário não encontrado
      content_type :json
      { message: "Usuário não encontrado" }.to_json
    end
  else
    status 400 # Bad Request
    content_type :json
    { message: "ID de usuário inválido" }.to_json
  end
end

# Fechar a conexão com o cliente após as operações
at_exit do
  client.close
end
