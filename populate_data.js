const db = require(`./models/db.js`);

var post = {
    title: `An Ode to Lumpia`,
    username: `H.P.Lovecraft`,
    tag: [`Poem`, `Food`],
    general:   `You make it with fresh meat
                From a fat and happy pig
                You can make it with shrimp
                Giving it a fishy good stink
                Add salt and pepper for flavor
                Minced onions and carrots, no taters
                Use a head of garlic for boldness
                And add a little dash of niceness
                A bit of soy sauce can be used
                Worcestershire for the adventurous
                Some use herbs and fish sauce
                And mix it all up with no pause
                But youâ€™ll have to roll it after
                Hence the name of the liâ€™l critter
                So buy a nice spring roll wrap
                And roll away after filling it up
                A quick bath in heated hot oil
                Is what each needs to fulfill
                Its destiny of crunchy goodness
                In ones tummy it will reach absolute happiness`,
    upvote: [],
    downvote: [],
    comment: 5
};

/***********************FEAT-WORKS**************************************************/
/* CONSTRUCTOR
var FeatWork = function(title, synopsis, image, url){
    this.title = title;
    this.synopsis = synopsis;
    this.image = image;
    this.url = url;
};
*/
var featWork1 = {
    title: `The Catcher in the Rye`,
    synopsis: `A teenager's dramatic struggle against death and growing up.`,
    image: `./public/images/published-1-1.jpg`,
    url: `https://www.amazon.com/Catcher-Rye-J-D-Salinger/dp/0316769487`
};

var featWork2 = {
    title: `The Lord Of The Flies`,
    synopsis: `A group of British boys stranded on an uninhabited island.`,
    image: `./public/images/published-1-2.jpg`,
    url: `https://www.amazon.com/Lord-Flies-William-Golding/dp/0399501487`
};

var featWork3 = {
    title: `1984`,
    synopsis: `A dystopian world ruled by totalitarianism, mass surveillance, and a manipulated society.`,
    image: `./public/images/published-2-1.jpg`,
    url: `https://www.amazon.com/1984-Signet-Classics-George-Orwell/dp/0451524934`
};

var featWork4 = {
    title: `Uzumaki`,
    synopsis: `A town spiralling down into spirals.`,
    image: `./public/images/published-3-1.jpg`,
    url: `https://www.amazon.com/Uzumaki-3-1-Deluxe-vols/dp/1421561328`
};

/***********************USERS**************************************************/

/* CONSTRUCTOR
var User = function(fullname, email, username, password) {
    this.fullname = fullname;
    this.email = email;
    this.username = username;
    this.password = password;
    this.about_me;
    this.followed_users = new Array();
    this.followed_tags= new Array();
    this.feat_works = new Array();
    this.fav_works = new Array();
};
*/

var user1 = {
    username: `H.P.Lovecraft`,
    email: `lovecraft@yahoo.com`,
    password: `cthulhu`,
    realname: `Howard Philips`,
    about_me: `You question so little, thus you fear too little. No one knows what may be creeping on the realm of the unseen. Anyways, I love creating creepy and enigmatic deities. Short stories are my strong points. Willing to discuss about random stuff.`,
    followed_tags: [`Lovecraftian Mythos`, `Poems`, `Flash Fiction`, `Horror`, `Thriller`],
    fav_works: [`1984`, `Dagon`, `To Kill A Mockingbird`]
};

var user2 = {
    username: `GeorgeOrwell`,
    email: `george1984@yahoo.com`,
    password: `bigbro`,
    realname: `Eric Arthur Blair`,
    about_me: `Can you imagine a world where everything is upside down? Exploring the possibilities while reminiscing of the past make up for a great concoction of limitless worlds. Dystopian settings are always fun to workaround with.`,
    followed_tags: [`Lovecraftian Mythos`, `Flash Fiction`],
    fav_works: [`I Have No Mouth, and I Must Scream`, `The Call of Cthulhu`]
};

var user3 = {
    username: `Spiral`,
    email: `uzumaki@yahoo.com`,
    password: `guruguru`,
    realname: `Junjo Ito`,
    about_me: `What is the concept of scary for you? I myself can't say for sure.`,
    followed_tags: [`Horror`],
    fav_works: [`Salem's Lot`, `Ring`]
};

var user4 = {
    username: `FairyGold88`,
    email: `no-name@yahoo.com`,
    password: `88`,
    realname: `Rumplestiltskin`,
    about_me: `You'll never know about me.`,
    followed_tags: [],
    fav_works: [`Spider's Golden Silk`]
};

//Add Featured Works
user1.feat_works = [featWork1, featWork2];
user2.feat_works = [featWork3];
user3.feat_works = [featWork4];

//Add following
user1.followed_users = [user2.username, user3.username];
user2.followed_users = [user1.username, user3.username];
user3.followed_users = [user1.username, user2.username, user4.username];

var users = [user1, user2, user3, user4];

/***********************POSTS**************************************************/

/* CONSTRUCTOR
var Post = function(title, username, date) {
    this.title = title;
    this.username = username;
    this.date = date;
    this.tag = new Array();
    this.general;
    this.plot;
    this.characters;
    this.setting;
    this.media;
    this.upvote = 0;
    this.downvote = 0;
    this.comment = new Array();
}
*/

var post1 = {
    title: `An Ode to Lumpia`,
    username: `H.P.Lovecraft`,
    date: new Date(2020, 3, 24),
    tag: [`Poem`, `Food`],
    general:   `You make it with fresh meat
                From a fat and happy pig
                You can make it with shrimp
                Giving it a fishy good stink
                Add salt and pepper for flavor
                Minced onions and carrots, no taters
                Use a head of garlic for boldness
                And add a little dash of niceness
                A bit of soy sauce can be used
                Worcestershire for the adventurous
                Some use herbs and fish sauce
                And mix it all up with no pause
                But you'll have to roll it after
                Hence the name of the li'l critter
                So buy a nice spring roll wrap
                And roll away after filling it up
                A quick bath in heated hot oil
                Is what each needs to fulfill
                Its destiny of crunchy goodness
                In ones tummy it will reach absolute happiness`,
    upvote: [`H.P.Lovecraft`, `GeorgeOrwell`],
    downvote: [`FairyGold88`],
    comment: 3
};

var post2 = {
    title: `Lovecraft Universe: Who is Nyarlahotep?`,
    username: `GeorgeOrwell`,
    date: new Date(2020, 3, 23),
    tag: [`Lovecraftian Mythos`, `Discussion`],
    general:   `<b>Greetings!</b><br>Can we discuss on how mysterious the entire being of Nyarlahotep is? I consider myself to be fairly adept with regards to the knowledge in the Lovecraftian Mythos. Despite there having numerous "Gods", I consider Nyarlahotep to be one of the most enigmatic ones. What exactly are his goals in the Lovecraft Universe? Why is it there?`,
    upvote: [`H.P.Lovecraft`, `GeorgeOrwell`, `Spiral`],
    downvote: [],
    comment: 4
};

var post3 = {
    title: `LF Critique: Steampunk Dystopian Flash Fiction`,
    username: `GeorgeOrwell`,
    date: new Date(2020, 3, 22),
    tag: [`Thriller`, `Flash Fiction`],
    plot: `... Roger asked Robert if he found the key they were looking for. Robert looked at Roger straight in the eye before smacking him with his metallic oily paws. "Are you stupid?!" Robert exclaimed. "Did you honestly hope for me to give my life for something that might not even exist to begin with!?" While Roger was still dumbfounded with the intensity of the smack, he looked at Roger silently. Eventually his dumb face became twisted more and more as he became progressively irritated as Roger continued to berate him. He was about to give Robert a thing or two of his own medicine, when suddenly lights shone down from the balcony just overhead. They both stared at it intently for what seemed for an eternity. Suddenly the silence was broken... "RUN! THEY FOUND US!" Without hesitation Robert grabbed Roger's hand and went inside the underground sewage labyrinth...`,
    characters: `<b>Robert</b> - The steampunk dog that can transform into a humanoid werewolf if fed oil and coal.
    <b>Roger</b> - The sidekick of Robert. A scientist robbed of all sanity, and drained of all knowledge due to an unforeseen circumstance. Transformed into a rusty mute cyborg. They say he knows everything to the point where he is silenced by the Gods themselves in speaking the truth.`,
    setting: `1700s Victorian post-apocalyptic semi-futuristic wasteland. The lands are trodden by mutants, humanoids, and cyborgs alike. In the story, the characters are set on an alleyway of an abandoned manor infested with bugs and rodents.`,
    upvote: [`H.P.Lovecraft`, `GeorgeOrwell`],
    downvote: [`Spiral`],
    comment: 5
};

var post4 = {
    title: `Manga Appreciation: 渦巻`,
    username: `Spiral`,
    date: new Date(2020, 3, 28),
    tag: [`Horror`],
    media: `./public/images/post-5-img.jpg`,
    upvote: [`Spiral`, `H.P.Lovecraft`],
    downvote: [`GeorgeOrwell`]
};

var posts = [post1, post2, post3, post4];

/***********************COMMENTS**************************************************/
/* CONSTRUCTOR
var Comment = function(id, username, date, content) {
    this.id = id;
    this.username = username;
    this.date = date;
    this.content = content;
    this.upvote = 0;
    this.downvote = 0;
};
*/

var query1 = {
    title: `An Ode to Lumpia`
};

var query2 = {
    title: `Lovecraft Universe: Who is Nyarlahotep?`
};

var query3 = {
    title: `LF Critique: Steampunk Dystopian Flash Fiction`
};

var comment1 = {
    postId: 1,
    username: `H.P.Lovecraft`,
    date: new Date(2020, 3, 23),
    content: `First of all, I would like to say thanks for reading my works. It's a mystery as with any other entities in the universe. This what makes them so terrifying to begin with. Them being unknown and unfamiliar to us. However, feel free to connect the dots and at the very least find the rationale or small habits of each of them. I won't spoil them for you though :)`,
    upvote: [`H.P.Lovecraft`, `GeorgeOrwell`, `Spiral`],
    downvote: []
};

var comment2 = {
    postId: 2,
    username: `GeorgeOrwell`,
    date: new Date(2020, 3, 24),
    content: `Thank you for the reply! You know you're right about that one. As someone more into the dystopian setting, I understand where you're coming from. The property of "unknowningness" gives and propagates a sense of fear afterall.`,
    upvote: [`H.P.Lovecraft`, `GeorgeOrwell`],
    downvote: [`FairyGold88`]
};

var comment3 = {
    postId: 3,
    username: `H.P.Lovecraft`,
    date: new Date(2020, 3, 25),
    content: `You probably should've defined or at the very least given light on what they are running from in your description. We can't really critique much on this. Also fix your formatting and story flow.`,
    upvote: [`Spiral`, `GeorgeOrwell`],
    downvote: []
};

var comment4 = {
    postId: 4,
    username: `GeorgeOrwell`,
    date: new Date(2020, 3, 25),
    content: `...You may be right...`,
    upvote: [`H.P.Lovecraft`],
    downvote: []
};

var comments = [comment1, comment2, comment3, comment4];

db.insertMany(`users`, users, function(){});
db.insertMany(`posts`, posts, function(){});
db.insertMany(`comments`, comments, function(){});

//db.insertOne(`posts`, post, function(){});
