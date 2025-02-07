use crate::services::media_service;
use tauri::command;

#[command]
pub fn search_media_files(search_path: &str) -> Result<Vec<String>, String> {
    media_service::find_media_files(search_path)
}

#[command]
pub fn play_media_file(file_path: &str) -> Result<(), String> {
    media_service::play_media_file(file_path)
}
