// Trang chủ

// San pham
// - Tạo chức năng thêm sản phẩm vào giỏ hàng, kiểm tra bằng localStorage.getItem()
var itemList = {
    "sp001" : {
        "name": "",
        "price": "",
        "photo" : "./Assets/img/sanpham/"
        },
    "sp002" : {
        "name": "",
        "price": "",
        "photo" : "./Assets/img/sanpham/"
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
document.getElementById("signUp").addEventListener("submit", function(event){
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


// Lien he

// Gioi thieu
// - Tạo slide show sản phẩm
// https://www.w3schools.com/howto/howto_js_slideshow.asp

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
        currentRow.appendChild(amount)
        currentRow.appendChild(price)
        currentRow.appendChild(photo)
        currentRow.appendChild(total)
        currentRow.appendChild(btnSlot)

        const tbody = document.getElementsByTagName('tbody')[0]
        tbody.appendChild(currentRow)        
        

    }
    // Hien thi thong tin Tfoot
    const sum = document.getElementById('productSum')
    sum.textContent = priceSum

    let tax = 0.1 * priceSum
    const taxCell = document.getElementById('tax')
    
    taxCell.textContent = tax

    const final = document.getElementById("Total")
    final.textContent = (priceSum + tax)

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
// createCartData()
