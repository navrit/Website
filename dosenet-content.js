function units_used() {
    document.getElementById("text_field").innerHTML =
        "<div class =\"jumbotron\" >" +
        "<div class =\"jh5\">" +
            "Units Used" +
        "</div>" +
        "<div class =\"jp\">" +
        "Background radiation is present everywhere. However, there are also many common, everyday human activities that expose you to radiation. The units used here are a sample of different sources of radiation in everyday activity and allow you to compare the background dose to these different activities. In these cases the dose stated corresponds to the effective dose equivalent for that exposure." +
        "</div>" +
        "</div>"
    }
function map_explained() {
    document.getElementById("text_field").innerHTML =
        "<div class =\"jumbotron\" >" +
        "<div class =\"jh5\">" +
            "How the map works" +
        "</div>" +
        "<div class =\"jp\">" +
        "The map uses Google Maps with pinpoints at each dosimeter location. These dosimeters then update to show the current radiation level. Clicking on any of the points will bring up a new window, displaying more information about the individual detector and allow you to view the radiation level as a function of time. The units can be changed using the dropdown just above the map. These units show the background radiation level in terms of more familiar units." +
        "</div>" +
        "</div>"
}

function about_radiation(){
    document.getElementById("text_field").innerHTML =
        "<div class =\"jumbotron\" >" +
        "<div class =\"jh5\">" +
            "The radiation level is higher today than it was yesterday. Should I be concerned?" +
        "</div>" +
        "<div class =\"jp\">" +
        "Probably not. In the same way that some days are windy and other days are calm, the background radiation level can change from day to day. What matters more than the dose each day is the overall trend in the dose over time." +
        "<br><a href=\"http://www.epa.gov/radiation/understand/perspective.html\">EPA - Understand perspective</a>" +
        "</div>" +

        "<div class =\"jh5\">" +
            "Will I be okay from receiving radiation?" +
        "</div>" +
        "<div class =\"jp\">" +
        "Very likely. Just as skin heals after a sunburn, the human body has ways of dealing with small amounts of radiation. Life on earth has existed with this background radiation for a very long time. In the same way life has adapted to sunlight, life has adopted to background radiation; it is a part of life and our bodies have mechanisms for repairing the damage that small doses cause." +
        "</div>" +
        "<div class =\"jh5\">" +
            "The area where I live seems higher than other areas, should I be concerned?" +
        "</div>" +
        "<div class =\"jp\">" +
        "Different locations have different amounts of natural radiation background. The background in Denver, for example, is considerably higher compared to that at sea level. Some variation in background level is to be expected, just as different places have different weather." +
        "</div>" +
        "</div>";
}

function about_dosenet(){
    document.getElementById("text_field").innerHTML =
        "<div class =\"jumbotron\" >" +
        "<div class =\"jh5\">" +
            "About the Devices" +
        "</div>" +
        "<div class =\"jp\">" +
        "The DoseNet devices are radiation detectors placed throughout the UC Berkeley campus, Berkeley and the bay area more generally. These dosimeters measure the amount of radiation that enters the detector and deposits energy every minute. This value is then converted to a count rate and used to calculate the amount of dose that is exposed to people.  Each dosimeter then takes this measurement and sends it to a central server, where it is displayed on RadWatch.  This system is unique in that it allows for real-time monitoring of radiation levels." +
        "</div>" +
        "</div>";
}

timeframe = "hour";
function get_timeframe(){
    var sel_time = document.getElementById('time_dropdown');
    timeframe = sel_time.options[sel_time.selectedIndex].value;
}

unit = "CPM";
function setHTML_units(){
    var sel = document.getElementById('dose_dropdown');
    unit = sel.options[sel.selectedIndex].value;
    switch(unit) {
        case 'cigarette':
            document.getElementById("text_field").innerHTML =
            "<div class =\"jumbotron\" >" +
            "<div class =\"jh5\">" +
            "Cigarettes (1 pack (20 cigarettes) = 6 µSv)</a>" +
            "</div>" +
            "<div class =\"jp\">" +
            "'While cigarette smoke is not an obvious source of radiation exposure, it contains small amounts of radioactive materials [polonium-210 and lead-210] which smokers bring into their lungs as they inhale. The radioactive particles lodge in lung tissue and over time contribute a huge radiation dose. Radioactivity may be one of the key factors in lung cancer among smokers.' See <a href=\"http://www.epa.gov/radiation/sources/tobacco.html\">U.S. Environmental Protection Agency</a>" +
            "<br><br><a href=\"http://www.ncrponline.org/Learn_More/Did_You_Know_95.html\">Equivalent dose estimation</a>" +
            "...'greatest contributor to the effective population dose equivalent of all consumer products. In fact, tobacco products probably would have been the greatest single contributor to the effective population dose equivalent of all radiation sources, including natural background sources and medical radiation [NCRP Report No. 93 summarizing exposures from all sources (NCRP, 1987a)].'" +
            "<br><br>This unit compares the effective dose equivalent for how many cigarettes would give you the same dose per hour. <br><a href=\"http://www.rmeswi.com/36.html\">Radiation Measurement and Elimination Services</a>" +
            "</div>" +
            "</div>";
        break;
        case 'plane':
            document.getElementById("text_field").innerHTML =
            "<div class =\"jumbotron\" >" +
            "<div class =\"jh5\">" +
            "Time on Airplane (2.38 µSv per hour)" +
            "</div>" +
            "<div class =\"jp\">" +
            "Radiation also comes from the sun, solar wind, and other cosmic radiation. The bulk of this radiation is blocked by the Earth’s atmosphere. However, when flying across the country, the increased altitude means the air is thinner. With thinner air, there is less protection from this cosmic radiation. This means that while flying in an airplane, you receive a higher dose of radiation than you would on the ground." +
            "<br><br>This unit gives the amount of time on an airplane would correspond to the same effective dose. <br><a href=\"http://www.hps.org/publicinformation/ate/faqs/commercialflights.html\">HPS Public information</a>" +
            "</div>" +
            "</div>";
        break;
        case 'medical':
            document.getElementById("text_field").innerHTML =
            "<div class =\"jumbotron\">" +
            "<div class =\"jh5\">" +
            "Medical Procedures (X-ray = 5 - 15 µSv, Chest CT = 7 mSv)" +
            "</div>" +
            "<div class =\"jp\">" +
            "Getting x-rayed at the dentist’s office or getting CT scans at a hospital are common occurrences. These forms of imaging help doctors see inside the body and allow them to more easily do their jobs. However, such procedures do expose one’s body to some dose of radiation. This amount varies from procedure to procedure." +
            "<br><br>The units here compare how many 5 µSv X-rays would need to be taken to give you the same effective dose as standing at this location for one hour." +
            "<br><a href=\"http://www.radiologyinfo.org/en/pdf/sfty_xray.pdf\">Radiology information</a>" +
            "<br><a href=\"http://www.nrc.gov/about-nrc/radiation/around-us/doses-daily-lives.html\">NRC - Daily lives</a>" +
            "</div>"
            "</div>";
        break;
        case 'CPM':
            document.getElementById("text_field").innerHTML =
            "<div class =\"jumbotron\">" +
            "<div class =\"jh5\">" +
            "CPM" +
            "</div>" +
            "<div class =\"jp\">" +
            "Counts per minute on that detector scaled from a 5 minute measurement time" +
            "</div>" +
            "</div>";
        break;
        case 'REM':
            document.getElementById("text_field").innerHTML =
            "<div class =\"jumbotron\">" +
            "<div class =\"jh5\">" +
            "Millirem per hour (mREM/hr) - 1 mREM/hr = 10 µSv/hr" +
            "</div>" +
            "<div class =\"jp\">" +
            "The millirem (equal to 1/1000th of a rem) is an older measurement of radiation dose that the Sievert replaced. It is still common  however, in the literature on radiation dose. Because of this, it is included in here as well. The mREM/hr unit is the dose rate - the dose absorbed per hour of exposure." +
            "</div>" +
            "</div>";
        break;
        case 'USV':
        document.getElementById("text_field").innerHTML =
            "<div class =\"jumbotron\">" +
            "<div class =\"jh5\">" +
            "Micro-Sievert per hour (µSv/hr)" +
            "</div>" +
            "<div class =\"jp\">" +
            "The Sievert is the standard (SI) unit of absorbed dose. It is related to the amount of energy that radiation deposits in the body. 1 Sv is defined as being 1 joule of energy that is absorbed in 1 kg of tissue. 1 µSv is equal to 10^-6 (0.000001) Sv. Sv/hr is the dose rate - the dose absorbed per hour of exposure." +
            "</div>" +
            "</div>";
        break;
        default:
        document.getElementById("text_field").innerHTML = "...";
    }
}
