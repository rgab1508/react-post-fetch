import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Card, CardContent, CardMedia, CircularProgress  } from '@material-ui/core';


function truncate(s, n) {
  if(s.length > n){
    return s.slice(0, n) + "....";  
  }
  else {
    return s;
  }
}


function PostTile(props) {
  return (
    <div style={{margin: "50px"}}>
      <Card style={{ display : "flex", flexDirection: 'row'}}>
        <CardMedia 
        style={{ height : "150px", width : "250px"}}
        image="https://i.stack.imgur.com/y9DpT.jpg"
        title="placeholder for post imgae"
        />

        <div style={{backgroundColor: "#e6e6e6"}} >
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2" style={{color : "#000"}} >
            {truncate(props.post.title, 40)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.post.body}
          </Typography>
        </CardContent>
        </div>
      </Card>
    </div>
  )
}


function PostList(props) {
  return (
    <div>
      {props.posts.map((post, id) => {
        return <PostTile key={id} post={post} />;
      })}
    </div>
  )
}

function App() {
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(ps => setPosts(prevPosts => {
      setPostLoading(false);
      return ps;
    }));
    // eslint-disable-next-line
  }, []);


  const containerStyles = {
    margin : "50px",
    paddingTop : "50px"
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">
            Posts
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={containerStyles}>
        {postLoading ? <CircularProgress style={{marginLeft: '50%'}} /> : <PostList posts={posts}/>}
      </Container>
    </div>
  );
}


export default App;
