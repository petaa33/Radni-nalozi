import { useState, useEffect } from "react";

const ShowcaseWindow = () => {
  const [imgUrl, setImgUrl] = useState({src: "https://plus.unsplash.com/premium_photo-1673545661153-9f3ab09fa232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"});
  const items = [
    {
      id: 0,
      src: "https://plus.unsplash.com/premium_photo-1673545661153-9f3ab09fa232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 1,
      src: "https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg",
    },
  ];
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     imgUrl.id === 1 ? setImgUrl(items[0]) : setImgUrl(items[1]);
  //     console.log(imgUrl.id);
  //   }, 3000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [imgUrl]);

  return <img src={imgUrl.src} style={{width: "100%", height: "100%"}} alt="slika" />;
};

export default ShowcaseWindow;
