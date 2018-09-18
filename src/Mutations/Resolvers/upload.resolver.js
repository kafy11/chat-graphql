import mysql from 'mysql2';

const result = {
    store: async function (args, options){
        console.log(options)
        const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "beach_paquera"
        })
        con.connect(function(err){
            if (err) throw err;

            if(options.type !== 'profile'){
                var sql = "INSERT INTO files (name, path, userId) VALUES ('"+args.filename+"', '"+args.path+"', '"+options.user+"')";
            }else{
                var sql = "UPDATE users SET photo='"+args.path+"' WHERE id = '"+options.user+"'";
            }

            con.query(sql, function (err, result) {
                if (err) throw err;

                return result;
            });
        })
    }
}

export default result;