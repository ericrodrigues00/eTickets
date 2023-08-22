require 'sinatra'
require 'mongo'
require 'json'

# Configurar a conexão com o servidor MongoDB
client = Mongo::Client.new('mongodb+srv://admin:adminadmin@cluster0.lcxcczi.mongodb.net/tex') # Substitua 'mydb' pelo nome do seu banco de dados
users_collection = client[:users] # Substitua 'users' pelo nome da sua coleção de usuários

# Configurar o CORS para permitir requisições da sua página em JavaScript (opcional)
before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

# Rota para receber os dados do formulário de login em JSON
post '/login' do
  request.body.rewind #Isso garante que o corpo da requisição esteja pronto para ser lido.
  data = JSON.parse(request.body.read) # Isso lê o corpo da requisição (que é em formato JSON) e o converte em um objeto Ruby.
  username = data['username'] # Aqui, estamos extraindo o nome de usuário do objeto JSON enviado na requisição.
  password = data['password'] # Aqui, estamos extraindo a senha de usuário do objeto JSON enviado na requisição.

  user = users_collection.find(username: username, password: password).first #Isso busca um usuário na coleção de usuários com as credenciais fornecidas.

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
