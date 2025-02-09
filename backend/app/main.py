from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

spotify = spotipy.Spotify(
    client_credentials_manager=SpotifyClientCredentials(
        client_id=os.getenv('SPOTIFY_CLIENT_ID'),
        client_secret=os.getenv('SPOTIFY_CLIENT_SECRET')
    )
)

@app.get("/")
def read_root():
    return {"message": "PlaylistDNA API is running"}


@app.get("/artist/{artist_id}")
def get_artist(artist_id: str):
    try:
        result = spotify.artist(artist_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/playlist/{playlist_id}")
def get_playlist(playlist_id: str):
    try:
        result = spotify.playlist(playlist_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))