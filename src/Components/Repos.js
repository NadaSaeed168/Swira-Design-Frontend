// import React, { Component } from 'react';
import '../CSS/Repos.css';
import React from "react";

export default class FetchRandomUser extends React.Component {
  state = {
    loading: true,
    people: []
  };

  async componentDidMount() {
    var date = new Date();
    date.setDate(date.getDate() - 30);
    var dateString = date.toISOString().split('T')[0];
    console.log(dateString);
    const url = 'https://api.github.com/search/repositories?q=created:>' + dateString +''+ '&sort=stars&order=desc&page=1';
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ repos: data.items, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.repos.length) {
      return <div>didn't get a repo</div>;
    }

    return (
      <div>
        {this.state.repos.map(repo => (
          <div>
            <div className="s">
              <img src = {repo.owner.avatar_url} alt="owner photo" className="ownerphoto"/>
              <div>
              <span className="reponame">{repo.name}</span>
              <div className="des">{repo.description}</div>
            <p className="side star1 stars">Stars: {repo.stargazers_count}</p>
            <p className="side stars">Issues: {repo.open_issues}</p>
            <p className="stars">Created By: {repo.owner.login}</p>
            </div>
            </div>
            {/* 
             */}
          </div>
        ))}
      </div>
    );
  }
}