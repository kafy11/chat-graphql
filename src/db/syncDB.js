import Conn, { User, Chat } from './sqlite';

Conn.sync({ force: true }).then(async () => {
    const user1 = await User.create({
        name: "Person 1",
        email: "person1@email.com"
    });

    const user2 = await User.create({
        name: "Person 2",
        email: "person2@email.com"
    });

    Chat.create({
        participant1Id: user1.id,
        participant2Id: user2.id,
    });

    console.log('DB connection sucessful.');
}, function(err){
    console.log('Error while syncing',err);
});