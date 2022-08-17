<template>
  <div>
    <section id="about">
      <div class="container">
        <header class="section-header aos-init">
          <h3>About Us</h3>
          <p>
            Welcome to our recipes site ! <br />
            you can create, find, like and share your special recipes with
            people around the world.
            <br>
             In addition, you can see how many people watched or liked your great recipes!
          </p>
        </header>
        <div class="row about-cols">
          <div class="col-md-4">
            <div class="about-col">
              <div class="img">
                <!-- <img
                  src="https://hauteliving.com/wp-content/uploads/2013/12/The-Gordon-Ramsay-Pub-Grill-Team-at-Caesars-Palace-toasts-to-a-successfull-first-year-2.jpg"
                  alt=""
                  class="img-fluid"
                /> -->
                <div class="icon"><i class="fas fa-users"></i></div>
              </div>
              <h2 class="title">Our Team</h2>
              <p>
               Liron Groer, Shir Indaporker, Anna kolkovsky.
              </p>
              <p>
                We are 3'rd year students in Information Systems and Software engineering at Ben-Gurion university.
              </p>
              <div class="d-flex justify-content-center"></div>
            </div>

          </div>
          <div class="col-md-4">
            <div class="about-col">
              <div class="img">
                <div class="icon"><i class="fas fa-project-diagram"></i></div>
              </div>
              <h2 class="title">Our Project</h2>
              <p>
                As part of a web development environment course we developed a full stack web application.
                This project includes an API for the Client-Server communication using Yaml,a server side using node.js and database using mySQL, for receive and respond requests according to the API. 
              </p>
              <div class="d-flex justify-content-center"></div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="about-col">
              <div class="img">
                <div class="icon"><i class="fas fa-history"></i></div>
              </div>
              <h2 class="title">Previous Work</h2>  
              <div class="pre" >                                       
                <div class="pre-links">           
                  <a class="links" href="https://web-development-environments-2022.github.io/316551142/">Yona's Personal Wesite</a>
                  <br>
                  <a class="links" href="https://web-development-environments-2022.github.io/206260218/2/">Sarah's Personal Website</a>
                  <br>
                  <a class="links" href="https://web-development-environments-2022.github.io/321892408//">Arnold's Personal Wesite</a>
                  <br>
                </div>            
                <div style=" margin-left:7%;">
                  <a class="links" href=" https://web-development-environments-2022.github.io/assignment2-316551142_206260218_321892408/">Pacman Game </a>
                </div>
              </div>
              <div class="d-flex justify-content-center"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style>
a:hover {
  text-decoration: none;
}
#about {
  background: url("../b12.jpeg") center top no-repeat fixed;
  background-size: cover;
  padding: 29px 0 40px 0;
  position: relative;
}

.section-header h3 {
  font-size: 32px;
  color: #111;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  position: relative;
  padding-bottom: 15px;
}

.section-header h3::before {
  content: "";
  position: absolute;
  display: block;
  width: 120px;
  height: 1px;
  background: #ddd;
  bottom: 1px;
  left: calc(50% - 60px);
}

.section-header h3::after {
  content: "";
  position: absolute;
  display: block;
  width: 40px;
  height: 3px;
  background: rgba(149, 179, 169, 1);
  bottom: 0;
  left: calc(50% - 20px);
}

.section-header p {
  text-align: center;
  color: #333;
}

#about::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgb(255 255 255 / 48%);
  z-index: 9;
}

#about .container {
  position: relative;
  z-index: 10;
}

#about .about-col {
  background: #fff;
  background-color: #95b3a966;
  border-radius: 10%;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  box-sizing: content-box;  
  height: 280px;
  border: #333;
}

#about .about-col .img {
  position: relative;
}

#about .about-col .img img {
  border-radius: 4px 4px 0 0;
}

#about .about-col .icon {
  width: 64px;
  height: 60px;
  padding-top: 12px;
  text-align: center;
  position: absolute;
  background-color: rgba(149, 179, 169, 1);;
  border-radius: 50%;
  text-align: center;
  border: 4px solid #fff;
  left: calc(50% - 32px);
  bottom: -30px;
  transition: 0.3s;
}

#about .about-col i {
  font-size: 24px;
  line-height: 1.5;
  color: #fff;
  transition: 0.3s;
}

/* #about .about-col:hover .icon {
  background-color: #fff;
} */

/* #about .about-col:hover i {
  color: rgba(149, 179, 169, 0.75);
} */

#about .about-col h2 {
  color: #000;
  text-align: center;
  font-weight: 700;
  font-size: 28px;
  padding: 0;
  margin: 40px 0 12px 0;
  cursor: default;
  padding-top: 40px;

}

#about .about-col h2 a {
  color: #000;
}

/* #about .about-col h2 a:hover {
  color:rgba(149, 179, 169, 0.75);
} */

#about .about-col p {
  font-size: 13px;
  line-height: 24px;
  color: #333;
  margin-bottom: 0;
  padding: 0 20px 15px 20px;
}
.btn-sm-default-web {
  background: #0c2b4b;
  display: inline-block;
  text-transform: uppercase;
  padding: 5px 30px;
  color: #ffffff;
  letter-spacing: 1px;
}
.pre{
  padding-left:18%;
  padding-top: 0.5%;
}
.pre-title{
    font-size:16px;
    margin-top: 6%;
    margin-bottom: 6%;
    text-align: center;
    font-weight: bold;
    text-decoration: underline;
}
.pre-links{
   margin-left:7%;
   margin-top: 5%;

}
.links{
font-size:16px;
}
</style>
