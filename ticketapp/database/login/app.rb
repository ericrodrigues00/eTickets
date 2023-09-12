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
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
end

enable :sessions
set :bind, '0.0.0.0'
set :port, 4567

# Rota para login do usuário
post '/login' do
  request.body.rewind
  data = JSON.parse(request.body.read)

  email = data['email']
  password = data['password']

      # Exemplo de depuração simples no seu código de login
  puts "Email recebido: #{email}" 
  puts "Senha recebida: #{password}"
  # Verificar se o usuário com o email fornecido existe no banco de dados
  user = users_collection.find(email: email).first

  if user
    # Exemplo de depuração para verificar a senha criptografada no banco de dados
    puts "Senha armazenada no banco: #{user['password']}"

    if BCrypt::Password.new(user['password']) == password
      # Autenticação bem-sucedida
      session[:user_id] = user['_id']
      status 200
      { message: "Login bem-sucedido" }.to_json
    else
      status 401 # Unauthorized
      { message: "Credenciais inválidas" }.to_json
    end
  else
    status 401 # Unauthorized
    { message: "Credenciais inválidas" }.to_json
  end
end

# Rota para obter os dados do usuário logado
get '/getUserData' do
  if session[:user_id]
    # O usuário está autenticado, então você pode buscar seus dados
    user = users_collection.find(_id: session[:user_id]).first
    content_type :json
    user.to_json
  else
    status 401 # Unauthorized
    { message: "Usuário não autenticado" }.to_json
  end
end

# Rota para encerrar a sessão (logout)
post '/logout' do
  session[:user_id] = nil
  status 200
  { message: "Sessão encerrada" }.to_json
end

# Fechar a conexão com o cliente após as operações
at_exit do
  client.close
end


