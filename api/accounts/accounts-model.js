const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = async (id) => {
  const account = await db('accounts')
  .where('id', id).first()
  return account
}

const create = async (account) => {
  const [ id ] = await db('accounts')
    .insert({
      name: account.name.trim(),
      budget: account.budget
    })
   const newAccount = await getById(id)
   return newAccount
}

const updateById = async (id, account) => {
  const numUpdated = await db('accounts')
    .where('id', id)
    .update(account)
  const updatedAccount = getById(id)
  return updatedAccount
};

const deleteById = async (id) => {
  const deletedAccount = getById(id)
  const numDeleted = await db('accounts').where('id', id).del()
  return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
