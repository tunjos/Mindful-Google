const HIDE_ALL_TAB_AUTOCOMPLETE = "hideAllTabAutocomplete";
const HIDE_NEWS_TAB_AUTOCOMPLETE = "hideNewsTabAutocomplete";
const HIDE_IMAGES_TAB_AUTOCOMPLETE = "hideImagesTabAutocomplete";
const HIDE_VIDEOS_TAB_AUTOCOMPLETE = "hideVideosTabAutocomplete";
const HIDE_MAPS_TAB_AUTOCOMPLETE = "hideMapsTabAutocomplete";
const HIDE_SHOPPING_TAB_AUTOCOMPLETE = "hideShoppingTabAutocomplete";
const HIDE_BOOKS_TAB_AUTOCOMPLETE = "hideBooksTabAutocomplete";
const HIDE_FLIGHTS_TAB_AUTOCOMPLETE = "hideFlightsTabAutocomplete";
const HIDE_FINANCE_TAB_AUTOCOMPLETE = "hideFinanceTabAutocomplete";

const HIDE_RESULT_STATS_ROW = "hideResultStatsRow";
const HIDE_SPELLING_SEARCH_REDIRECT = "hideSpellingSearchRedirect";
const HIDE_SHOWING_RESULTS_FOR_AND_SEARCH_INSTEAD_FOR_ROW = "hideShowingResultsForRowAndSearchInsteadForRow"
const HIDE_SHOWING_RESULTS_FOR_ROW = "hideShowingResultsForRow";
const HIDE_SEARCH_INSTEAD_FOR_ROW = "hideSearchInsteadForRow";
const HIDE_RELATED_SEARCHES_ROW = "hideRelatedSearchesRow";

const HIDE_TOP_STORIES_CARD = "hideTopStoriesCard";
const HIDE_TWITTER_CARD = "hideTwitterCard";
const HIDE_PEOPLE_ALSO_ASK_CARD = "hidePeopleAlsoAskCard";
const HIDE_IMAGES_CARD = "hideImagesCard";
const HIDE_VIDEOS_CARD = "hideVideosCard";
const HIDE_COMPLEMENTARY_RESULTS_CARD = "hideComplementaryResultsCard";
const HIDE_SEE_RESULTS_ABOUT_CARD = "hideSeeResultsAboutCard";

const HIDE_PAGINATION_FOOTER = "hidePaginationFooter";
const HIDE_LOCATION_AND_LINKS_FOOTER = "hideLocationAndLinksFooter";
const HIDE_LOCATION_FOOTER = "hideLocationFooter";
const HIDE_LINKS_FOOTER = "hideLinksFooter";

const HIDE_GOOGLE_YOUTUBE_AUTOCOMPLETE = "hideGoogleYoutubeAutocomplete";
const HIDE_GOOGLE_YOUTUBE_MUSIC_AUTOCOMPLETE = "hideGoogleYoutubeMusicAutocomplete";
const HIDE_GOOGLE_PLAY_STORE_AUTOCOMPLETE = "hideGooglePlayStoreAutocomplete";
const HIDE_GOOGLE_PLAY_STORE_MENU_CARD = "hideGooglePlayStoreMenuCard";
const HIDE_GOOGLE_PLAY_STORE_SIMILAR_CARD = "hideGooglePlayStoreSimilarCard";

const tabCheckboxIds = [HIDE_ALL_TAB_AUTOCOMPLETE, HIDE_NEWS_TAB_AUTOCOMPLETE, HIDE_IMAGES_TAB_AUTOCOMPLETE,
HIDE_VIDEOS_TAB_AUTOCOMPLETE, HIDE_MAPS_TAB_AUTOCOMPLETE, HIDE_SHOPPING_TAB_AUTOCOMPLETE, HIDE_BOOKS_TAB_AUTOCOMPLETE,
HIDE_FLIGHTS_TAB_AUTOCOMPLETE, HIDE_FINANCE_TAB_AUTOCOMPLETE]
const rowCheckboxIds = [HIDE_RESULT_STATS_ROW, HIDE_SPELLING_SEARCH_REDIRECT, HIDE_SHOWING_RESULTS_FOR_AND_SEARCH_INSTEAD_FOR_ROW,
HIDE_SHOWING_RESULTS_FOR_ROW, HIDE_SEARCH_INSTEAD_FOR_ROW, HIDE_RELATED_SEARCHES_ROW]
const cardCheckboxIds = [HIDE_TOP_STORIES_CARD, HIDE_TWITTER_CARD, HIDE_PEOPLE_ALSO_ASK_CARD, HIDE_IMAGES_CARD, HIDE_VIDEOS_CARD,
HIDE_COMPLEMENTARY_RESULTS_CARD, HIDE_SEE_RESULTS_ABOUT_CARD]
const footerCheckboxIds = [HIDE_PAGINATION_FOOTER, HIDE_LOCATION_AND_LINKS_FOOTER, HIDE_LOCATION_FOOTER, HIDE_LINKS_FOOTER]
const othersCheckboxIds = [HIDE_GOOGLE_YOUTUBE_AUTOCOMPLETE, HIDE_GOOGLE_YOUTUBE_MUSIC_AUTOCOMPLETE, HIDE_GOOGLE_PLAY_STORE_AUTOCOMPLETE,
HIDE_GOOGLE_PLAY_STORE_MENU_CARD, HIDE_GOOGLE_PLAY_STORE_SIMILAR_CARD]

const tabDefaults = [true, true, true, true, true, true, true, true, true]
const rowDefaults = [false, true, true, true, true, true]
const cardDefaults = [true, true, true, true, true, true, true]
const footerDefaults = [false, true, true, true]
const othersDefaults = [true, true, true, false, true]

const DEFAULT_SETTINGS = "defaultSettings"

const GOOGLE_URL = "*://www.google.com/*"
const YOUTUBE_URL = "*://www.youtube.com/*"
const YOUTUBE_MUSIC_URL = "*://music.youtube.com/*"
const GOOGLE_PLAY_STORE_URL = "*://play.google.com/*"

chrome.tabs.query({ active: true, currentWindow: true, url: [GOOGLE_URL, YOUTUBE_URL, YOUTUBE_MUSIC_URL, GOOGLE_PLAY_STORE_URL]}, tabs => {
	if (tabs.length === 0)
        return;
	toggleSections(tabCheckboxIds);
	toggleSections(rowCheckboxIds);
	toggleSections(cardCheckboxIds);
	toggleSections(footerCheckboxIds);
	toggleSections(othersCheckboxIds);
});

function toggleSections(keys) {
		chrome.storage.sync.get(keys, items => {
			// console.log(items);
			keys.forEach(key => {
					doToggleCheckbox(key, items[key]);
			});
		});
}

function doToggleCheckbox(type, hide) {
	if (hide == undefined){
		hide = false;
	}
	$('#'+type).prop('checked', hide).attr('disabled', false);
}

$(function() {
	checkFirstLoad();

	tabCheckboxIds.forEach((item) => {
			$('#'+item).click(evt => {
				var newVal = $('#'+item).prop('checked');
				saveSettings(item, newVal);
				toggleSetting(item, newVal, GOOGLE_URL);
			});
	});

	rowCheckboxIds.forEach((item) => {
			$('#'+item).click(evt => {
				var newVal = $('#'+item).prop('checked');
				saveSettings(item, newVal);
				toggleSetting(item, newVal, GOOGLE_URL);
			});
	});

	cardCheckboxIds.forEach((item) => {
			$('#'+item).click(evt => {
				var newVal = $('#'+item).prop('checked');
				saveSettings(item, newVal);
				toggleSetting(item, newVal, GOOGLE_URL);
			});
	});

	footerCheckboxIds.forEach((item) => {
			$('#'+item).click(evt => {
				var newVal = $('#'+item).prop('checked');
				saveSettings(item, newVal);
				toggleSetting(item, newVal, GOOGLE_URL);
			});
	});

	othersCheckboxIds.forEach((item) => {
			$('#'+item).click(evt => {
				var newVal = $('#'+item).prop('checked');
				saveSettings(item, newVal);
				toggleSetting(item, newVal, YOUTUBE_URL);
				toggleSetting(item, newVal, YOUTUBE_MUSIC_URL);
				toggleSetting(item, newVal, GOOGLE_PLAY_STORE_URL);
			});
	});

	$('#'+DEFAULT_SETTINGS).click(evt => {
		setDefaults()

		toggleSetting(DEFAULT_SETTINGS, true, GOOGLE_URL);
		toggleSetting(DEFAULT_SETTINGS, true, YOUTUBE_URL);
		toggleSetting(DEFAULT_SETTINGS, true, YOUTUBE_MUSIC_URL);
		toggleSetting(DEFAULT_SETTINGS, true, GOOGLE_PLAY_STORE_URL);
	});
});

//TODO Maybe add active???
function toggleSetting(type, hide, url) {
	// chrome.tabs.query({currentWindow: true, url: url}, tabs => {
	chrome.tabs.query({active: true, currentWindow: true, url: url}, tabs => {
		if (tabs.length === 0)
			return;
		tabs.forEach(tab => {
			chrome.tabs.sendMessage(tab.id, {type: type, hidden: hide}, (response) => {
				if (response) {
					response.typeIds.forEach((key) => {
						doToggleCheckbox(key, response.hidden);
						saveSettings(key, response.hidden);
					});
				}
  		});
		});
	});
};

function saveSettings(type, hide) {
	chrome.storage.sync.set({[type]: hide}, () => {
 		console.log(type +' settings saved: '+ hide);
	});
}

function saveTypeSettings(types, defaults) {
	for (i = 0; i < types.length; i++) {
  	saveSettings(types[i], defaults[i]);
	}
}

function restoreDefaults(types, defaults) {
	for (i = 0; i < types.length; i++) {
  	doToggleCheckbox(types[i], defaults[i]);
	}
}

function checkFirstLoad() {
	chrome.storage.sync.get([DEFAULT_SETTINGS], item => {
		console.log(item[DEFAULT_SETTINGS]);
		if (item[DEFAULT_SETTINGS] != true) {
			saveSettings(DEFAULT_SETTINGS, true);

			setDefaults()

			toggleSetting(DEFAULT_SETTINGS, true, GOOGLE_URL);
			toggleSetting(DEFAULT_SETTINGS, true, YOUTUBE_URL);
			toggleSetting(DEFAULT_SETTINGS, true, YOUTUBE_MUSIC_URL);
			toggleSetting(DEFAULT_SETTINGS, true, GOOGLE_PLAY_STORE_URL);
		}
	});
}

function setDefaults() {
	saveTypeSettings(tabCheckboxIds, tabDefaults);
	saveTypeSettings(rowCheckboxIds,rowDefaults);
	saveTypeSettings(cardCheckboxIds, cardDefaults);
	saveTypeSettings(footerCheckboxIds, footerDefaults);
	saveTypeSettings(othersCheckboxIds, othersDefaults);

	restoreDefaults(tabCheckboxIds, tabDefaults);
	restoreDefaults(rowCheckboxIds,rowDefaults);
	restoreDefaults(cardCheckboxIds, cardDefaults);
	restoreDefaults(footerCheckboxIds, footerDefaults);
	restoreDefaults(othersCheckboxIds, othersDefaults);
}
