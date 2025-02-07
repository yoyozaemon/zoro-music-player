// use std::path::PathBuf;
use rodio::{Decoder, OutputStream, Sink};
use std::fs::File;
use std::io::BufReader;
use walkdir::WalkDir;

pub fn find_media_files(search_path: &str) -> Result<Vec<String>, String> {
    let supported_extensions = ["mp3", "mp4", "wav", "flac", "m4a", "ogg"];
    let mut media_files = Vec::new();

    WalkDir::new(search_path)
        .follow_links(true)
        .into_iter()
        .filter_map(|entry| entry.ok())
        .filter(|entry| {
            if let Some(extension) = entry.path().extension() {
                if let Some(ext_str) = extension.to_str() {
                    return supported_extensions.contains(&ext_str.to_lowercase().as_str());
                }
            }
            false
        })
        .for_each(|entry| {
            if let Some(path_str) = entry.path().to_str() {
                media_files.push(path_str.to_string());
            }
        });

    Ok(media_files)
}

pub fn play_media_file(file_path: &str) -> Result<(), String> {
    let (_stream, stream_handle) = OutputStream::try_default().map_err(|e| e.to_string())?;

    let file = File::open(file_path).map_err(|e| e.to_string())?;

    let reader = BufReader::new(file);
    let decoder = Decoder::new(reader).map_err(|e| e.to_string())?;

    let sink = Sink::try_new(&stream_handle).map_err(|e| e.to_string())?;

    sink.append(decoder);
    sink.play();

    Ok(())
}
