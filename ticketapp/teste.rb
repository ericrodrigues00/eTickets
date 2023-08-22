require 'mongo'

# Configurar a conexão com o servidor MongoDB
client = Mongo::Client.new('mongodb+srv://admin:adminadmin@cluster0.lcxcczi.mongodb.net/tex') # Substitua 'mydb' pelo nome do seu banco de dados


# Obter uma referência para uma coleção
collection = client[:users] # Substitua 'mycollection' pelo nome da sua coleção

# Documento a ser inserido na coleção
doc_to_insert = {
  name: 'Marcola chefe do trafico',
  email: 'Marcola@pcc.com',
  cpf: '12345678965',
  password: 'marcola',
  confirmPassword:'marcola',
  __v:'1',
}

# Inserir o documento na coleção
result = collection.insert_one(doc_to_insert)

if result.n == 1
  puts "Documento inserido com sucesso!"
else
  puts "Falha ao inserir o documento."
end

# Fechar a conexão com o cliente após as operações
client.close




