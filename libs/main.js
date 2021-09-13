// Content Script
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

const DEFAULT_SETTINGS = "defaultSettings"

toggleSections(tabCheckboxIds);
toggleSections(rowCheckboxIds);
toggleSections(cardCheckboxIds);
toggleSections(footerCheckboxIds);
toggleSections(othersCheckboxIds);

function toggleSections(keys) {
 	chrome.storage.sync.get(keys, items => {
		keys.forEach(key => {
        doToggleSection(key, items[key], true);
		});
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  doToggleSection(message.type, message.hidden, false, sendResponse);
  return true;
});

chrome.runtime.sendMessage({ from: 'main', subject: 'showPageAction' });

function doToggleSection(type, hide, intializer, sendResponse) {
  switch (type) {
    case HIDE_ALL_TAB_AUTOCOMPLETE:
      (!(hide && $(".a4bIc").eq(0).attr("jscontroller","")) && reloadPage(intializer))
      break;
    case HIDE_NEWS_TAB_AUTOCOMPLETE:
      break;
    case HIDE_IMAGES_TAB_AUTOCOMPLETE:
      (!(hide && $(".s2N9A").eq(0).attr("jscontroller","")) && reloadPage(intializer))
      break;
    case HIDE_VIDEOS_TAB_AUTOCOMPLETE:
      (!(hide && $(".gstl_0.sbdd_a").eq(0).attr("hidden", true)) && reloadPage(intializer))
      if (!intializer) {
        sendResponse({typeIds:[HIDE_BOOKS_TAB_AUTOCOMPLETE], hidden: hide});
      }
      break;
    case HIDE_MAPS_TAB_AUTOCOMPLETE:
      (!(hide && $(".sbdd_b").eq(0).attr("hidden", true) && $(".gstl_50.sbdd_a").eq(0).attr("hidden", true)) && reloadPage(intializer))
      break;
    case HIDE_SHOPPING_TAB_AUTOCOMPLETE:
      (!(hide && $(".UUbT9").eq(0).attr("hidden", true)) && reloadPage(intializer))
      break;
    case HIDE_BOOKS_TAB_AUTOCOMPLETE:
      (!(hide && $(".gstl_0.sbdd_a").eq(0).attr("hidden", true)) && reloadPage(intializer))
      if (!intializer) {
        sendResponse({typeIds:[HIDE_VIDEOS_TAB_AUTOCOMPLETE], hidden: hide});
      }
      break;
    case HIDE_FLIGHTS_TAB_AUTOCOMPLETE:
      break;
    case HIDE_FINANCE_TAB_AUTOCOMPLETE:
      break;
    case HIDE_RESULT_STATS_ROW:
      (!(hide && $('#extabar').hide()) && $('#extabar').show())
      break;
    case HIDE_SPELLING_SEARCH_REDIRECT:
      (!(hide && $('.spell_orig').eq(1)[0].click()) && null)
      break;
    case HIDE_SHOWING_RESULTS_FOR_AND_SEARCH_INSTEAD_FOR_ROW:
      (!(hide && $('#taw').hide()) && $('#taw').show())
      break;
    case HIDE_SHOWING_RESULTS_FOR_ROW:
      (!(hide && $('.gL9Hy').eq(0).hide() && $('#fprsl').hide()) && $('.gL9Hy').eq(0).show() && $('#fprsl').show())
      break;
    case HIDE_SEARCH_INSTEAD_FOR_ROW:
      (!(hide && $('.spell_orig').eq(0).hide() && $('.spell_orig').eq(1).hide()) && $('.spell_orig').eq(0).show() && $('.spell_orig').eq(1).show())
      break;
    case HIDE_RELATED_SEARCHES_ROW:
      (!(hide && $('#bres').hide()) && $('#bres').show())
      break;
    case HIDE_TOP_STORIES_CARD:
      (!(hide && $('.ULSxyf').eq(0).hide() && $('.ULSxyf').eq(2).hide()) && $('.ULSxyf').eq(0).show() && $('.ULSxyf').eq(2).show())
      break;
    case HIDE_TWITTER_CARD:
      (!(hide && $('.g.eejeod').eq(0).hide()) && $('.g.eejeod').eq(0).show())
      break;
    case HIDE_PEOPLE_ALSO_ASK_CARD:
      (!(hide && $('.g.kno-kp.mnr-c.g-blk').eq(0).hide()) && $('.g.kno-kp.mnr-c.g-blk').eq(0).show())
      break;
    case HIDE_IMAGES_CARD:
      (!(hide && $('.LnbJhc').eq(0).hide()) && $('.LnbJhc').eq(0).show())
      break;
    case HIDE_VIDEOS_CARD:
      (!(hide && $('.HD8Pae.luh4tb.cUezCb.xpd.O9g5cc.uUPGi').eq(0).hide()) && $('.HD8Pae.luh4tb.cUezCb.xpd.O9g5cc.uUPGi').eq(0).show())
      break;
    case HIDE_COMPLEMENTARY_RESULTS_CARD:
      (!(hide && $('.liYKde.g.VjDLd').eq(0).hide()) && $('.liYKde.g.VjDLd').eq(0).show())
      break;
    case HIDE_SEE_RESULTS_ABOUT_CARD:
      (!(hide && $('.g.VjDLd.mnr-c.g-blk').eq(0).hide()) && $('.g.VjDLd.mnr-c.g-blk').eq(0).show())
      break;
    case HIDE_PAGINATION_FOOTER:
      (!(hide && $('[role="navigation"]').hide()) && $('[role="navigation"]').show())
      break;
    case HIDE_LOCATION_AND_LINKS_FOOTER:
      (!(hide && $('#footcnt').hide()) && $('#footcnt').show())
      if (!intializer) {
        sendResponse({typeIds:[HIDE_LOCATION_FOOTER, HIDE_LINKS_FOOTER], hidden: hide});
      }
      break;
    case HIDE_LOCATION_FOOTER:
      (!(hide && $('.fbar.b2hzT').eq(0).hide()) && $('.fbar.b2hzT').eq(0).show())
      break;
    case HIDE_LINKS_FOOTER:
      (!(hide && $('.fbar').eq(2).hide()) && $('.fbar').eq(2).show())
      break;
    case HIDE_GOOGLE_YOUTUBE_AUTOCOMPLETE:
      (!(hide && $(".gstl_50.sbdd_a").eq(0).attr("hidden", true)) && reloadPage(intializer))
      break;
    case HIDE_GOOGLE_YOUTUBE_MUSIC_AUTOCOMPLETE:
      (!(hide && $('#suggestion-list').hide()) && $('#suggestion-list').show())
      break;
    case HIDE_GOOGLE_PLAY_STORE_AUTOCOMPLETE:
      (!(hide && $('.qZxJ9').eq(0).attr("hidden", true)) && $('.qZxJ9').eq(0).attr("hidden", false))
      break;
    case HIDE_GOOGLE_PLAY_STORE_MENU_CARD:
      (!(hide && $('.Knqxbd.tzLNed').eq(0).attr("hidden", true)) && reloadPage(intializer))
      break;
    case HIDE_GOOGLE_PLAY_STORE_SIMILAR_CARD:
      (!(hide && $(".tlG8q").eq(0).css("display", "none")) && reloadPage(intializer))
      break;
    case DEFAULT_SETTINGS:
      reloadPage(intializer);
      break;
    default:
      text = "Default";
  }
}

function reloadPage(intializer) {
  (!intializer && location.reload(true))
}

function restoreDefaults() {

}
