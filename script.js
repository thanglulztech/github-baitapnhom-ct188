// Trang chủ

// San pham
// - Tạo chức năng thêm sản phẩm vào giỏ hàng, kiểm tra bằng localStorage.getItem()
var itemList = {
    "sp001" : {
        "name": "sp1",
        "price": "1000",
        "photo" : "./Assets/img/sanpham/d8aeaef948d01830baae79deb60158c4.jpg"
        },
    "sp002" : {
        "name": "sp2",
        "price": "2000",
        "photo" : "./Assets/img/sanpham/fcdfd3373d8f0b84a8d5e61454d946ae.jpg"
        },
    }

// Dang nhap
// - Đăng nhập bằng thông tin lưu trữ ở local storage
const loginF = document.getElementById("loginF");
if(loginF){
    document.getElementById("loginF").addEventListener("submit", function(event){
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const psw = document.getElementById("psw").value.trim();
    
        const user = localStorage.getItem(username);
    
        if(user){
            const parseUser = JSON.parse(user);
            if(parseUser.psw === psw){
                localStorage.setItem("user", JSON.stringify(parseUser));
                window.location.href = "trangchu.html";
            }else{
                alert("Incorrect Password")
            }
        }else{
            alert("User not found");
        }
    });
} 

// Dang ky
// - Tạo chức năng đăng ký, lưu trữ thông tin đăng nhập ở local storage (key là "name" và "psw"), kiểm tra bằng localStorage.getItem()
const message = document.getElementById('messageDisplay');
const signUppage = document.getElementById("signUp")
if (signUppage){

    signUppage.addEventListener("submit", function(event){
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const psw = document.getElementById("psw").value.trim();
        const confirmPsw = document.getElementById("confirmPsw").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    
        if (!strongPasswordRegex.test(psw)) {
            alert("Password must be strong! Requirements: Minimum 8 characters, At least 1 uppercase letter, 1 lowercase letter, At least 1 number, At least 1 special character (!@#$%^&*...).");
            return;
        }
        if( psw !== confirmPsw){
            alert("Password do not match");
            return;
        }
        if (username.length < 5) {
            alert("Login name must be at least 4 characters!");
            return;
        }
    
        const user = {
            username : username,
            psw : psw,
            email : email,
            phone : phone,
        };
        localStorage.setItem(username, JSON.stringify(user));
        alert("Sign Up Successful!");
        setTimeout(function() {
            window.location.href = 'trangchu.html'; 
        }, 1000);
    
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('psw').value = '';
        document.getElementById('confirmPsw').value = '';
        document.getElementById('phone').value = '';
    
    });
}


// Lien he

const contactForm = document.getElementById('contactForm')
if (contactForm){
    contactForm.addEventListener('submit', (e)=> {
        e.preventDefault()
        alert('Gui gop y thanh cong')
    })
}

// Gioi thieu
    const bannerItems = document.getElementsByClassName('bannerItem')
    var amount = 5
    var currentBannerIndex = 0

    const prevBtn = document.getElementById('prev')
    const nextBtn = document.getElementById('next')
    if (prevBtn && nextBtn){

        prevBtn.addEventListener('click', (e)=> {
            // Ẩn item hiện tại
            var currentBannerItem = bannerItems[currentBannerIndex]
            currentBannerItem.classList.add('fade')
            
            // Hiện item kế tiếp
            currentBannerIndex = currentBannerIndex-1
            if (currentBannerIndex < 0) currentBannerIndex = amount-1
            currentBannerItem = bannerItems[currentBannerIndex]
            currentBannerItem.classList.remove('fade')
    
        })
        
        nextBtn.addEventListener('click', (e)=> {
                // Ẩn item hiện tại
                var currentBannerItem = bannerItems[currentBannerIndex]
                currentBannerItem.classList.add('fade')
                
                // Hiện item kế tiếp
                currentBannerIndex = currentBannerIndex+1
                if (currentBannerIndex >= amount) currentBannerIndex = 0
                
                currentBannerItem = bannerItems[currentBannerIndex]
                currentBannerItem.classList.remove('fade')
            })

    }
    

// Gio hang




function createCartData(){
    localStorage.setItem("sp001", 3)
    localStorage.setItem("sp002", 5)
    localStorage.setItem("sp003", 0)
}



function displayCart(){
    var currentCart ={}

    for (item of Object.keys(itemList)){
        if (localStorage.getItem(item)) {
            currentCart[item] = itemList[item]
            currentCart[item].amount = localStorage.getItem(item)
            currentCart[item].code = item
        }
    }
    

    let priceSum = 0
    for (item in currentCart){

        let name = document.createElement('td')
        name.textContent = currentCart[item].name
        
        
        let amount = document.createElement('td')
        amount.textContent = currentCart[item].amount
        
        
        let price = document.createElement('td')
        price.textContent = currentCart[item].price
        
        let photo = document.createElement('td')
        photo.innerHTML = "<img src='"+ currentCart[item].photo+"'/>"
        
        let total = document.createElement('td')
        total.innerHTML = currentCart[item].amount * currentCart[item].price
        priceSum+= (currentCart[item].amount * currentCart[item].price)
        
        let btn = document.createElement('button')
        btn.className='cancelBtn'
        btn.id = currentCart[item].code
        btn.innerHTML = "Hủy"
        
        
        let btnSlot = document.createElement('td')
        btnSlot.appendChild(btn)

        let currentRow = document.createElement('tr')
        currentRow.id = currentCart[item].code
        currentRow.appendChild(name)
        currentRow.appendChild(photo)
        currentRow.appendChild(price)
        currentRow.appendChild(amount)
        currentRow.appendChild(total)
        currentRow.appendChild(btnSlot)

        const tbody = document.getElementsByTagName('tbody')[0]
        tbody.appendChild(currentRow)        
        

    }
    // Hien thi thong tin Tfoot
    const sum = document.getElementById('productSum')
    sum.textContent = priceSum

}

const cartTable = document.getElementById('cartTable')
if (cartTable) displayCart()


const removeBtns = document.getElementsByClassName('cancelBtn')
for (let btn of removeBtns){
    btn.addEventListener('click',()=> {
            if (btn.id && localStorage.getItem(btn.id)){
                localStorage.removeItem(btn.id)
                location.reload()
            }
        })
};

const Paybtn = document.getElementById('payBtn')
if (Paybtn) {
    Paybtn.addEventListener('click', (e)=> {
        alert('Thanh toan thanh cong')
    })
}
// createCartData()
