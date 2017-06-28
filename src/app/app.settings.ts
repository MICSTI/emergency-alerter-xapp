/**
 * Created by michael.stifter on 16.03.2017.
 */
export class AppSettings {
    // Base URL of the API endpoint
    public static API_ENDPOINT = "https://crpladev-emal.herokuapp.com/api";

    // Base URL of Google Maps Reverse Geocoding API
    public static GOOGLE_MAPS_REVERSE_GEOCODING_API = "https://maps.googleapis.com/maps/api/geocode/json?latlng={LAT},{LNG}&key=AIzaSyBW6PfkQhZTr6Ol_7OAeJyykdVVPFHWEqg";

    // radius where police stations should be located
    public static POLICE_STATION_RADIUS_METRES = 10000;

    // default time for displaying toasts
    public static TOAST_DEFAULT_DURATION = 3000;

    // Google Maps zoom level
    public static GOOGLE_MAPS_ZOOM_LEVEL = 12;
}
