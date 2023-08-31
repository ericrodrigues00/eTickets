require 'sinatra'
require 'mongo'
require 'json'

# Configurar a conexão com o servidor MongoDB
client = Mongo::Client.new('mongodb+srv://admin:adminadmin@cluster0.lcxcczi.mongodb.net/tex')
users_collection = client[:users]

# Configurar o CORS para permitir requisições da sua página em JavaScript (opcional)
before do
  response.headers['Access-Control-Allow-Origin'] = '*' # Permitir acesso de todos os domínios (cuidado com segurança)
  response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
end

# Configurar o servidor Sinatra para ouvir em todos os endereços IP (cuidado com segurança)
set :bind, '0.0.0.0'
set :port, 4567

# Rota para receber os dados do formulário de login em JSON
post '/login' do
  request.body.rewind
  data = JSON.parse(request.body.read)
  email = data['email']
  password = data['password']

  user = users_collection.find(email: email, password: password).first

  if user
    status 200
    content_type :json
    { message: "Login bem-sucedido" }.to_json
  else
    status 401
    content_type :json
    { message: "Credenciais inválidas" }.to_json
  end
end

# Fechar a conexão com o cliente após as operações
at_exit do
  client.close
end
