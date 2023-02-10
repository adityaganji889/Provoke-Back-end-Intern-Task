const express = require("express");
const cors = require("cors");
const Blog = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const snapshot = await Blog.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
  if(list){
    res.send(list)
  }
  else{
    res.send({msg: "No records to display"})
  }
});

app.get("/getByPostId/:id", async (req, res) => {
  const id = req.params.id;
  const snapshot = await Blog.get();
  const obj = snapshot.docs.map((doc) => {
    if(doc.id===id){
      return(doc.data())
    }
  });
  let obj1 = obj.filter((item)=>{
    return item!==undefined
  })
  if(obj1){
    res.send(obj1);
  }
  else{
    res.send({msg: "No records to display"})
  }
});

app.get("/getByUserId/:id", async (req, res) => {
  const id = Number(req.params.id);
  const snapshot = await Blog.get();
  const obj = snapshot.docs.map((doc) => {
    if(doc.data().userId===id){
      return ({ id: doc.id, ...doc.data()})
    }
  });
  let obj1 = obj.filter((item)=>{
    return item!==undefined
  })
  if(obj1){
    res.send(obj1);
  }
  else{
    res.send({msg: "No records to display"})
  }
})

app.post("/create", async (req, res) => {
  if(req.body.userId!==""&&req.body.publishedBy!==""&&req.body.blogImage!==""&&req.body.publishedAt!==""&&req.body.description!==""){
    const data = req.body;
    await Blog.add(data);
    res.send({ msg: "Blog Added" });
  }
  else{
    res.send({msg: "Please enter complete post details."})
  }
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const userId = Number(req.body.userId)
  const snapshot = await Blog.get();
  const obj = snapshot.docs.map((doc) => {
   if(doc.id===id){
    const data1 = doc.data()
    if(data1.userId===userId){
      return true
    }
   }
   else{
    return false
   }
  });
  let obj1 = obj.filter((item)=>{
    return item===true
  })
  if(obj1[0]===true){
    const data = req.body;
    if(data.userId!==null&&data.publishedBy!==""&&data.blogImage!==""&&data.publishedAt!==""&&data.description!==""){
      await Blog.doc(id).update(data);
      res.send({ msg: "Updated" });
    }
    else{
      res.send({msg: "Please enter updated post details."}) 
    }
  }
  else{
    res.send({ msg: "You're trying to update someone else's post"})
   }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const userId = Number(req.body.userId)
  const snapshot = await Blog.get();
  const obj = snapshot.docs.map((doc) => {
   if(doc.id===id){
    const data1 = doc.data()
    if(data1.userId===userId){
      return true
    }
   }
   else{
    return false
   }
  });
  let obj1 = obj.filter((item)=>{
    return item===true
  })
  if(obj1[0]===true){
    await Blog.doc(id).delete();
    res.send({ msg: "Deleted" });
  }
  else{
    res.send({ msg: "You're trying to delete someone else's post"})
  }
});

app.listen(4000, () => console.log("Up & RUnning *4000"));
