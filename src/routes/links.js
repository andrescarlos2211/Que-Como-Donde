app.use(express.static(__dirname + "/src/public", {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));
