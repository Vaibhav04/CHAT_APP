// const path = require('path');
// const fs = require('fs');

module.exports = function(formidable, Group, aws){
    return {
        setRouting: function(router) {
            router.get('/dashboard', this.adminPage);

            router.post('/uploadFile', aws.Upload.any(), this.uploadFile);
            router.post('/dashboard', this.adminPostPage);
        },


        adminPage: function(req, res) {
            res.render('admin/dashboard');
        },

        uploadFile: function (req, res) {
            const form = new formidable.IncomingForm();
            // form.uploadDir = path.join(__dirname, '../public/uploads');
            form.on('file', (field, file) => {
                // fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                //     if(err) throw err;
                //     console.log('file renamed successfully');
                // })
            });

            form.on('error', (err) => {
                console.log(err);
            });

            form.on('end', () => {
                console.log('file uploaded');
            });

            form.parse(req);
        },

        adminPostPage: function (req, res) {
            const newGroup = new Group();
            newGroup.name = req.body.group;
            newGroup.category = req.body.category;
            newGroup.image = req.body.upload;
            newGroup.save((err) => {
                res.render('admin/dashboard');
            })
        }
    }
}