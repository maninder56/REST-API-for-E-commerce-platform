const AccessControl = require('role-acl'); 
const ac = new AccessControl();

ac.grant('user').condition(
    {
        Fn:'EQUALS', 
        args: {
            'requester':'$.owner'
        }
    }).execute('read').on('user', ['*', '!user_password']); // change variable to bd names 


ac.grant('user').condition(
    {
        Fn:'EQUALS', 
        args: {
            'requester':'$.owner'
        }
    }).execute('update').on('user', ['user_firstname', 'user_lastname', 'user_email', 'user_password']);


// admin permisions 
ac.grant('admin').execute('read').on('user');

ac.grant('admin').execute('read').on('users');

ac.grant('admin').execute('update').on('user');

ac.grant('admin').condition(
    {
        Fn:'NOT_EQUALS',
        args: {
            'requester':'$.owner'
        }
    }).execute('delete').on('user');


exports.readAll = (requester) => 
ac.can(requester.role).execute('read').sync().on('users');

exports.read = (requester, data) =>
ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('user');

exports.update = (requester, data) =>
ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('user');

exports.delete = (requester, data) =>
ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('user');


