// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";

  import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAtC2Uic-02nAKkXlY-F3CPlKZNE--Wluw",
    authDomain: "infinet-6ff36.firebaseapp.com",
    projectId: "infinet-6ff36",
    storageBucket: "infinet-6ff36.firebasestorage.app",
    messagingSenderId: "1069205416365",
    appId: "1:1069205416365:web:81411d9a9191272d30d924",
    measurementId: "G-STJL0YDFQ4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);



var defaultUsers = [
    { username: "bob", email: "bob@mail.com", password: "bobpass" },
    { username: "xlia0", email: "xlia0@mail.com",password: "pass123" }
    
];
    var currentUser = null;
    var nextId = 21;

    var categoryImages = {
        travel: [
            "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600&h=220&fit=crop"
        ],
        food: [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=220&fit=crop"
        ],
        nature: [
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=220&fit=crop"
        ],
        photography: [
            "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=600&h=220&fit=crop"
        ],
        lifestyle: [
            "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1490750967868-88df5691cc9b?w=600&h=220&fit=crop",
            "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=600&h=220&fit=crop"
        ]
    };

    var imgIndexes = { travel: 0, food: 0, nature: 0, photography: 0, lifestyle: 0 };

    function nextImg(cat) {
        var arr = categoryImages[cat];
        var url = arr[imgIndexes[cat] % arr.length];
        imgIndexes[cat]++;
        return url;
    }

    var defaultPosts = [
        { id:1,  user:"_xlia0.o",       category:"travel",      text:"golden hour over the valley 🌿 #travel #photography",                 likes:24, liked:false, bookmarked:false, comments:["User143: Comment here!", "loveStay: Nah, comment there."], img: categoryImages.travel[0] },
        { id:6,  user:"travelwithkai",  category:"travel",      text:"found this hidden waterfall on a hike 🌊 worth every step",            likes:52, liked:false, bookmarked:false, comments:["nomad.co: where is this?!", "kai_world: Dominica!"],         img: categoryImages.travel[1] },
        { id:11, user:"roamingrita",    category:"travel",      text:"cobblestone streets and no wifi. living my best life 🧭",              likes:47, liked:false, bookmarked:false, comments:["wanderlust.k: dream trip"],                                   img: categoryImages.travel[2] },
        { id:16, user:"viewfromhere",   category:"travel",      text:"bus windows are the best photo studios 🚌🌄 #roadtrip",                likes:31, liked:false, bookmarked:false, comments:[],                                                            img: categoryImages.travel[3] },
        { id:2,  user:"mk_frames",      category:"food",        text:"morning ritual, slow and warm ☕ #food #slowliving",                   likes:11, liked:false, bookmarked:false, comments:[],                                                            img: categoryImages.food[0] },
        { id:7,  user:"platefully",     category:"food",        text:"homemade ramen from scratch 🍜 took 3 hours, gone in 10 mins",         likes:44, liked:false, bookmarked:false, comments:["foodie99: recipe please!"],                                  img: categoryImages.food[1] },
        { id:12, user:"cafe.culture",   category:"food",        text:"this croissant changed my life 🥐 paris did not disappoint",           likes:38, liked:false, bookmarked:false, comments:["breaddaily: goals"],                                         img: categoryImages.food[2] },
        { id:17, user:"fermentfiona",   category:"food",        text:"first sourdough loaf of the season 🍞 the crust crackle 🤌",           likes:26, liked:false, bookmarked:false, comments:["breadhead: perfection"],                                     img: categoryImages.food[3] },
        { id:3,  user:"jnvisions",      category:"nature",      text:"stillness between the trees 🌲 #nature",                              likes:37, liked:false, bookmarked:false, comments:["greenleaf: so peaceful!"],                                   img: categoryImages.nature[0] },
        { id:8,  user:"earthframes",    category:"nature",      text:"dawn at the coast 🌅 woke up at 4am for this shot",                   likes:61, liked:false, bookmarked:false, comments:[],                                                            img: categoryImages.nature[1] },
        { id:13, user:"soilsong",       category:"nature",      text:"replanted my whole balcony garden 🌱 watching things grow is therapy", likes:22, liked:false, bookmarked:false, comments:[],                                                            img: categoryImages.nature[2] },
        { id:18, user:"mossgarden",     category:"nature",      text:"morning fog through the pine trees 🌲🌫️ #forest #peace",               likes:40, liked:false, bookmarked:false, comments:["naturelover: magical"],                                     img: categoryImages.nature[3] },
        { id:4,  user:"sara.lens",      category:"photography", text:"chasing light, finding calm 📷 #photography",                         likes:19, liked:false, bookmarked:false, comments:[],                                                            img: categoryImages.photography[0] },
        { id:10, user:"lensbylu",       category:"photography", text:"shooting in film is a whole different feeling 🎞️ #analog",             likes:33, liked:false, bookmarked:false, comments:[],                                                            img: categoryImages.photography[1] },
        { id:15, user:"shutterdan",     category:"photography", text:"caught this reflection completely by accident 🌀 #streetphoto",        likes:55, liked:false, bookmarked:false, comments:["eyefordetail: incredible"],                                  img: categoryImages.photography[2] },
        { id:20, user:"goldenhour.g",   category:"photography", text:"you can never take too many sunset shots 🌇 #goldenHour",              likes:67, liked:false, bookmarked:false, comments:["sunsetlvr: never tired of these"],                           img: categoryImages.photography[3] },
        { id:5,  user:"urbanwanderer",  category:"lifestyle",   text:"slow mornings are the best mornings ✨ #lifestyle",                   likes:8,  liked:false, bookmarked:false, comments:[],                                                            img: categoryImages.lifestyle[0] },
        { id:9,  user:"the.minimalist", category:"lifestyle",   text:"decluttered my desk. my brain feels lighter 🪴 #minimal",             likes:29, liked:false, bookmarked:false, comments:["simplelife: yes!! same energy"],                             img: categoryImages.lifestyle[1] },
        { id:14, user:"openpage",       category:"lifestyle",   text:"reading on the porch with tea > everything else 📖☕",                likes:18, liked:false, bookmarked:false, comments:["bookworm.b: same"],                                          img: categoryImages.lifestyle[2] },
        { id:19, user:"quietspace",     category:"lifestyle",   text:"no phone sunday was the reset I needed 📵 try it",                    likes:14, liked:false, bookmarked:false, comments:[],                                                            img: categoryImages.lifestyle[3] }
    ];

    var users = JSON.parse(localStorage.getItem("inscape_users")) || defaultUsers;
    var posts = [];
    var currentUser = localStorage.getItem("inscape_current_user") || null;
    var seededKey = "inscape_seeded_firebase";

    imgIndexes = { travel: 0, food: 0, nature: 0, photography: 0, lifestyle: 0 };

    function nextImg(cat) {
        const arr = categoryImages[cat];
        const url = arr[imgIndexes[cat] % arr.length];
        imgIndexes[cat]++;
        return url;
    }

    function show(id) { document.getElementById(id).classList.add('show'); }

    function hide(id) { document.getElementById(id).classList.remove('show'); } 

    function swap(a, b) { hide(a); show(b); }

    function saveData() {

    localStorage.setItem("inscape_users", JSON.stringify(users));
    localStorage.setItem("inscape_current_user", currentUser || "");

    }

    function login() {
        var u = document.getElementById('loginUser').value.trim();
        var p = document.getElementById('loginPass').value;
        var match = null;
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
           if ((user.username === u || user.email === u) && user.password === p) {
                 match = user;
        }
        }
        if (match) {
            currentUser = match.username;
            hide('loginModal');
            saveData();
            updateUI();
            
        } else {
            document.getElementById('loginErr').style.display = 'block';
        }
    }

    function register() {
        var u = document.getElementById('regUser').value.trim(); 
        var e = document.getElementById('regEmail').value.trim();
        var p = document.getElementById('regPass').value;
        var c = document.getElementById('regConfirm').value;
        if (p !== c) { document.getElementById('regErr').style.display = 'block'; return; }
        if (!u || !e) return;
        users.push({ username: u,email: e, password: p });
        currentUser = u;
        hide('registerModal');
        saveData();
        updateUI();
        
    }

    function logout() { currentUser = null;saveData(); updateUI(); } 

    function updateUI() {
        if (currentUser) {
            document.getElementById('navArea').innerHTML =
                
                '<span style = "font-size: 13px; color: #888780; margin-right: 8px">Hi, ' + currentUser + ' 👋</span>' +
                
                '<button class = "btn-sage" onclick = "logout()">Logout</button>';
            document.getElementById('createBox').style.display = 'block';
            document.getElementById('guestMsg').style.display  = 'none';
        } else {
            document.getElementById('navArea').innerHTML =
                '<button onclick = "show(\'loginModal\')">Login</button>' +
                
                '<button class = "btn-green" onclick = "show(\'registerModal\')">Register</button>';
            document.getElementById('createBox').style.display = 'none';
            document.getElementById('guestMsg').style.display  = 'block';
        }
        renderFeed();
    }

    async function seedPostsIfNeeded() {
        if (localStorage.getItem(seededKey) === "true") return;

        const snapshot = await getDocs(collection(db, "posts"));
       if (!snapshot.empty) {
            localStorage.setItem(seededKey, "true");
            return;
        }

       for (const post of defaultPosts) {
            await addDoc(collection(db, "posts"), post);
        }

        localStorage.setItem(seededKey, "true");
    }

    async function loadPostsFromFirebase() {
        const snapshot = await getDocs(collection(db, "posts"));
        posts = [];

       snapshot.forEach((docSnap) => {
       posts.push({
            id: docSnap.id,
            ...docSnap.data()
        });
        });

       renderFeed();
    }

    function createPost() {
        var text = document.getElementById('newText').value.trim();
        if (!text || !currentUser) return;
        var cat = document.getElementById('newCategory').value;
        
        var newPost ={ id: nextId++, user: currentUser, category: cat, text: text, likes: 0, liked: false, bookmarked: false, comments: [], img: nextImg(cat) };

        var docRef = addDoc(collection(db, "posts"), newPost);  

        posts.unshift({
            id: docRef.id,
            ...newPost
        });

        document.getElementById('newText').value = '';
        saveData();
        renderFeed();
            
    }

    async function toggleLike(id) {
        if (!currentUser) { show('loginModal'); return; }

        var post = posts.find((item) => item.id === id);
        if (!post) return;

        post.likedBy = post.likedBy || [];
        var index = post.likedBy.indexOf(currentUser);

        if (index >= 0) {
            post.likedBy.splice(index, 1);
        } else {
           post.likedBy.push(currentUser);
        }

        post.likes = post.likedBy.length;


        await updateDoc(doc(db, "posts", id), { likedBy: post.likedBy, likes: post.likes });   
       
        saveData();
        renderFeed();
                
    };

    
      



    async function toggleBookmark(id) {
        if (!currentUser) { show('loginModal'); return; }
        const post = posts.find((item) => item.id === id);
        if (!post) return;

        post.bookmarkedBy = post.bookmarkedBy || [];
        var index = post.bookmarkedBy.indexOf(currentUser);

        if (index >= 0) {
            post.bookmarkedBy.splice(index, 1);
        } else {
            post.bookmarkedBy.push(currentUser);
        }

        await updateDoc(doc(db, "posts", id), { bookmarkedBy: post.bookmarkedBy});
        saveData();
        renderFeed();
            
    };

    async function addComment(id) {
        if (!currentUser) { show('loginModal'); return; }
        var input = document.getElementById('ci-' + id);
        var text = input.value.trim();
        if (!text) return;

        const post = posts.find((item) => item.id === id);
        if (!post) return;

        post.comments = post.comments || [];
        post.comments.push(currentUser + ": " + text);

        await updateDoc(doc(db, "posts", id), {comments: post.comments });

        input.value = "";
        saveData();
        renderFeed();
        
    }

    function renderFeed() {
        var cat   = document.getElementById('filterCat').value;
        var limit = document.getElementById('limitToggle').checked;
        var filtered   = posts.filter(function(p) { return cat === 'all' || p.category === cat; });
        var toShow     = (limit && filtered.length > 10) ? filtered.slice(0, 10) : filtered;
        var showBanner = limit && filtered.length > 10;
        var html = '';
        for (var i = 0; i < toShow.length; i++) html += makeCard(toShow[i]);
        document.getElementById('feed').innerHTML = html;
        document.getElementById('limitBanner').className = 'limit-banner' + (showBanner ? ' show' : '');
    }

    function makeCard(p) {
        var initials = p.user.replace(/[^a-zA-Z]/g, '').substring(0, 2).toUpperCase();
        var comments = p.comments || [];;
        var likedBy = post.likedBy || [];
        var bookmarkedBy = post.bookmarkedBy || [];
        var liked = currentUser ? likedBy.includes(currentUser) : false;
        var bookmarked = currentUser ? bookmarkedBy.includes(currentUser) : false;
        var commentsHTML = '';

        
        for (var i = 0; i < p.comments.length; i++) {
            var parts = p.comments[i].split(': ');
            commentsHTML += '<div class = "comment"><b>' + parts[0] + ':</b> ' + parts.slice(1).join(': ') + '</div>';
        }
        var commentInput = currentUser
            ? '<div class = "comment-row"><input type = "text" id = "ci-' + p.id + '" placeholder = "add a comment..." onkeydown="if(event.key===\'Enter\')addComment(' + p.id + ')"><button onclick="addComment(' + p.id + ')">Send</button></div>'
            : '';
        return (
            '<div class = "box" style = "padding: 0; overflow: hidden">' +
                '<div style = "padding:14px 14px 0">' +
                    
                    '<div class = "post-top">' +
                        
                        '<div class = "avatar">' + initials + '</div>' +
                        '<div>' +
                            '<div class = "post-username">' + p.user + '</div>' +
                            '<div style = "font-size:11px; color:#888780">' + p.category + '</div>' +
                        '</div>' +
                        '<div class = "post-category">' + p.category + '</div>' +
                    '</div>' +
                '</div>' +
                
                '<img class = "post-image" src = "' + p.img + '" alt = "' + p.category + '" />' +
                '<div style = "padding:12px 14px">' +
                    '<div style = "font-size: 13px; line-height: 1.6">' + p.text + '</div>' +
                    '<div>' +
                        
                        '<button class = "action-btn' + (p.liked ? ' active' : '') + '" onclick = "toggleLike(' + p.id + ')">' + (p.liked ? '❤️' : '🤍') + ' ' + p.likes + '</button>' +
                        '<button class = "action-btn' + (p.bookmarked ? ' active' : '') + '" onclick = "toggleBookmark(' + p.id + ')">' + (p.bookmarked ? '🔖 saved' : '🔖 save') + '</button>' +
                    '</div>' +
                    '<div style = "border-top: 1px solid #eae8e1; margin-top: 10px; padding-top: 10px">' + commentsHTML + commentInput + '</div>' +
                '</div>' +
            '</div>'
        );
    }

    async function ensureUsersCollection() {
        for (const user of users) {
        await setDoc(doc(db, "users", user.username), user, { merge: true });
        }
    }

    async function init() {
        savelData();
        updateUI();
        
        await ensureUsersCollection();
        await seedPostsIfNeeded();
        await loadPostsFromFirebase();
    }

init();

