/*
Reviewer ignore, for testing and reference only!
*/
var exported = {
    
    helloGet: function helloGet(request, h) {
        // console.log(request.payload);
        return 'Hello world!';
    },

    helloPost: function helloPost(request, h) {
        // console.log(request.payload);

        // console.log(JSON.stringify(request.payload));

        return `Your string: ${request.payload}`;
    },


    helloGreetUser: function helloGreetUser(request, h) {
        // console.log(request.payload);
        // console.log(JSON.stringify(request.payload));
        var usr = encodeURIComponent(request.params.user)
        return `hello ${usr}`;
    },


    helloNumberIndex: function helloNumberIndex(request, h) {
        // console.log(request.payload);
        // console.log(JSON.stringify(request.payload));
        var idx = encodeURIComponent(request.params.index)
        return `hello ${idx}`;
    },
}
module.exports = exported