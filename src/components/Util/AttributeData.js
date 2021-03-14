export const data = {
    'intAttr' : ['biodiversity_benefit', 'livelihood_benefit', 'local_benefit', 'carbon_credit_status', "minised_leakage"],
    'floatAttr' : ['carbon_sequestration'],
    'checkAttr' : ['domestic', "international", "nature_based"],
    'strAttr' : ['description']}

export const choiceMapping ={
    1:'Low',
    2:'Med',
    3:'High',
    4:'Very high',
    5:'In house',
    6:'Prelim',
    7:'3rd party'
}
export const tidyName = (str)=>{
    let w = str.split('_')
    for (var i =0; i<w.length; i++){
        w[i]=w[i][0].toUpperCase() + w[i].substr(1);
    }
    w=w.join(" ")
    return w
}