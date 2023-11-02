# yt-clone-2 (YouTube Clone)
<br>

## Introduction
This document outlines the design of a simplified YouTube clone skeleton. 
The primary goal of this project is not to replicate YouTube entirely but to build a foundational framework that implements key functionalities.
For those who do not already know, YouTube is a video-sharing platform that allows users to upload, view, rate, comment, and share videos.
The platform has over 1 billion daily active users. Given the scope, even the basic features like video rating and commenting are complex.
My focus will be on video uploading and to some extent, video viewing.

<br>

## Objectives
- User Authentication: Users can sign in/out using their Google account.
- Video Upload: Authenticated users can upload videos.
- Video Transcoding: Uploaded videos are transcoded into 360p.
- Video Viewing: Users can view a list of uploaded videos, whether signed in or not.
- Individual Video Viewing: Users can watch individual videos, whether signed in or not.

<br>

## High-Level Design

#### Video Storage (Google Cloud Storage)
Google Cloud Storage will host both raw and processed videos. This approach is simple, scalable, and cost-effective for storing and serving large video files.

<br>

#### Video Upload Events (Google Pub/Sub)
When a video is uploaded, we will publish a message to a Google Pub/Sub topic. This mechanism adds a layer of durability to video upload events and allows for asynchronous video processing.

<br>

#### Video Processing Workers (Google Cloud Run)
Upon the video upload event publication, a video processing worker will receive a message from Pub/Sub and transcode the video using FFmpeg, a widely used open-source tool for video processing. Google Cloud Run is employed to scale up and down based on the demands. Processed videos are subsequently uploaded to Cloud Storage.

<br>

#### Video Metadata (Google Firestore)
After video processing, metadata is stored in Firestore. The information is crucial for displaying processed videos on the web client. including details like title, description, etc.

<br>

#### Video API (Google Firebase Functions)
Google Firebase Functions is employed to create a straightforward API enabling users to upload videos and retrieve video metadata. This API can be readily extended to support additional CRUD operations.

<br>

#### Web Client (Next.js / Google Cloud Run)
To facilitate user interactions, a web client is built using Next.js. This client allows users to sign in and upload videos and will be hosted on Google Cloud Run.

<br>

#### Authentication (Google Firebase Authentication)
Google Firebase Authentication handles user authentication, simplifying integration with Google Sign-In.

<br>

## References
References can be found on Google Cloud Docs. (https://cloud.google.com/run/docs/overview/what-is-cloud-run)
