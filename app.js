const express=require('express');

const app=express();
const https=require('https');

const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.get('/',function(req,res){
  res.sendFile(__dirname+"/index.html");
  });
app.post('/',function(req,res){
  console.log(req.body.cityName);
  var query=req.body.cityname;

  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=6effa5a7f8d76de9dd63971aabdbee84";

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weather=JSON.parse(data);
      console.log(weather);
      const temp=weather.main.temp;
      console.log(temp);
      const weatherDes=weather.weather[0].description;
      console.log(weatherDes);
      const icon=weather.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"

      res.write("<h1>The temperture in"+query+ "is"+ temp +"degree celcius</h1>");
      res.write("<p>the weather is currently" +weatherDes+"</p>" );
      res.write("<img src=" +imageURL +">");
      res.send();
    })
  })
  
});

app.listen(3000,function(){
  console.log("server running at port 3000");
});
