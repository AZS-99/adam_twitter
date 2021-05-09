const Sequelize = require('sequelize')
const pg = require('pg')
const bcrypt = require('bcrypt')
pg.defaults.ssl = process.env.NODE_ENV === 'production'? { rejectUnauthorized: true } : false
const SALT_ROUNDS = 12

const database = new Sequelize(process.env.DATABASE_URL)

const users = require('./users')(database, Sequelize)
const sessions = require('./sessions')(database, Sequelize)
const posts = require('./posts')(database, Sequelize)


module.exports.add_user = async (user) => {
    try { await users.create(user) }
    catch (error) {console.log(error)}
}


module.exports.initialize = async () => {
    try { await database.sync() }
    catch (error) { console.log()}
}


module.exports.save_tweet = async (user_id, tweet) => {
    try {
        return await posts.create({
            user_id: user_id,
            tweet: tweet
        })
    } catch(error) {}
}


module.exports.verify = async(credentials) => {
    try {
        user = await users.findOne({where: {email: credentials.email}})
        verified = await bcrypt.compare(credentials.password, user.password)
        delete user.password
        return verified? user : false
    } catch (error) {console.log(error)}
}


module.exports.delete_tweet = async (id, user_id) => {
    try {
        return await database.query(`
            DELETE FROM posts
            WHERE id = :id AND user_id = :user_id
        `, {
            replacements: {
                id: id,
                user_id: user_id
            }
        })
    } catch(error) {}
}


module.exports.update_tweet = async (tweet_id, updated_tweet, user_id) => {
    try {
        console.log('wer are in')
        await posts.update({
            tweet: updated_tweet
        }, {
            where: {
                id: tweet_id,
                user_id: user_id
            }
        })
    } catch (error)  {

    }
}


