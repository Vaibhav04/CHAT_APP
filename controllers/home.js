module.exports = function(_, async, Group) {
    return {
        setRouting: function(router) {
            router.get('/home', this.home);
        },

        home: function(req, res) {
            async.parallel([
                // function(callback) {
                //     Group.find({}, (err, result) => {
                //         callback(err, result);
                //     })
                // },
                function(callback) {
                    Group.aggregate({
                        $group: {
                            _id: "$category"
                        }
                    }, (err, newResult) => {
                        callback(err, newResult);
                        console.log(err);
                    });
                },
            ], (err, results) => {
                // const res1 = results[0];
                const res2 = results[0];
                // console.log(res1);
                console.log(res2);
                const dataChunk = [];
                const chunkSize = 3;
                // for(let i = 0; i < res1.length; i += chunkSize ) {
                //     dataChunk.push(res1.slice(i, i+chunkSize));
                // }
                res.render('home', { title: 'Chatapp', data: dataChunk});
            })
        }
    }
}