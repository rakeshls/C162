AFRAME.registerComponent("bullets",{
init: function(){
this.shootBullet()
},
shootBullet:function(){
    window.addEventListener("keydown",(e)=>{
        if(e.key ==="a"){
            var bullet = document.createElement("a-entity")
            bullet.setAttribute("geometry",{
                primitive:"sphere",
                radius:0.2
            })
            bullet.setAttribute("material","color","black")
            var cam = document.querySelector("#camera")
            var camera = document.querySelector("#camera").object3D
            var direction = new THREE.Vector3()
            camera.getWorldDirection(direction)
            pos = cam.getAttribute("position")
            bullet.setAttribute("position",{
                x:pos.x,
                y:pos.y,
                z:pos.z
            })
            bullet.setAttribute("velocity", direction.multiplyScalar(-10))
            var scene= document.querySelector("#scene")
            bullet.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:"0"
            })
            bullet.addEventListener("collide",this.removeBullet)
            scene.appendChild(bullet)
        }
    })
},
removeBullet:function(e){
 console.log(e.detail.target.el)
 console.log(e.detail.body.el)
 var element= e.detail.target.el
 var elementHit = e.detail.body.el
 if(elementHit.id.includes("box")){
     elementHit.setAttribute("material",{
         opacity:0.6,
         transparent:true
     })
     var impulse = new CANNON.Vec3(-2 ,2 ,1)
     var worldPoint = new CANNON.Vec3().copy(
         elementHit.getAttribute("position")
     )
     elementHit.body.applyImpulse(impulse,worldPoint)
     element.removeEventListener("collide",this.shoot)
     var scene= document.querySelector("#scene")
     scene.removeChild(element)
 }
}
})