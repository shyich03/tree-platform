export const data = {
    'intAttr' : ['biodiversity_benefit', 'livelihood_benefit', 'local_benefit', 'carbon_credit_status', "minised_leakage"],
    'floatAttr' : ['carbon_sequestration'],
    'fundingAttr' : ['funding_goal'],
    'checkAttr' : ['domestic', "international", "nature_based"],
    'strAttr' : ['description']}

export const choiceMapping ={
    0:'None',
    1:'Low',
    2:'Med',
    3:'High',
    4:'Very high',
    5:'In house',
    6:'Prelim',
    7:'3rd party'
}

export const levelValue = {
    'Low' : 2,
    'Med' : 3,
    'High' : 4,
    'Very high' : 5,
    'In house' : 1,
    'Prelim': 1,
    '3rd party': 1,
    'None': 0
}

export const tableData = {
    'regionInfo' : ['region_id', 'project_name', 'partner_name'],
    'intAttr' : ['biodiversity_benefit', 'livelihood_benefit', 'local_benefit', 'carbon_credit_status', "minised_leakage"],
    'floatAttr' : ['carbon_sequestration'],
    'checkAttr' : ['domestic', "international", "nature_based"],
    'strAttr' : ['description']}

export const tidyName = (str)=>{
    let w = str.split('_')
    for (var i =0; i<w.length; i++){
        w[i]=w[i][0].toUpperCase() + w[i].substr(1);
    }
    w=w.join(" ")
    return w
}

export const extractValue = (s) => {
    let w = s.split('_')
    var guess = w[1] == 'g' ? true : false
    return guess, w[0]
}

export const levels = ["None","Low", "Med", "High", "Very high", "Prelim", "In house", "3rd party"]