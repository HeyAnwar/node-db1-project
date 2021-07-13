const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
    try {
      const newAccount = await Accounts.create(req.body)
      res.status(201).json(newAccount)
    } catch (err) {
      next(err)
    }
  }
)

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
    try {
      const updated = await Accounts.updateById(req.params.id, req.body)
      res.json(updated)
    } catch (err) {
      next(err)
    }
  }
)

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deletedRecord = await Accounts.deleteById(req.params.id)
    res.json(deletedRecord)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message
  })
})

module.exports = router;
