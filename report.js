function checkSingular(num, unit){
  var singular = {
    years:'year',
    minutes:'minute',
    hours:'hour',
    days:'day',
    months:'month',
    weeks:'week'
  };
  if(num<=1){
    return singular[unit];
  }
  return unit;
}

function location(loc){
  if(loc){
    return ' in '+loc;
  }
  return '';
}
function eventDetail(inviteType,talkType,eventName,eventLocation,travelType){
  var invite = {
    invited:'invited',
    cfp:'selected from CFP',
    sponsored:'sponsored'
  };
  var type = {
    talk:'to speak',
    panel:'to be on a panel',
    workshop:'to give a workshop'
  };
  var type2 ={
    talk:'I gave a talk',
    panel:'I was on a panel',
    workshop:'I run a workshop'
  };
   var type3 ={
    talk:' to give a talk',
    panel:' to be on a panel',
    workshop:' to run a workshop'
  };
  if(inviteType && talkType && eventName){
    return 'I was ' +invite[inviteType]+' '+ type[talkType] +' at '+ eventName + location(eventLocation)+travelDistance(travelType)+'.';
  }else if(!inviteType && talkType&& eventName){
    return  type2[talkType]+' at '+ eventName + location(eventLocation)+travelDistance(travelType)+'.';
  }else if(!inviteType && !talkType && eventName){
    return travelDistance(travelType, true)+' to speak at ' + eventName + location(eventLocation)+'.';
  }else if(!inviteType && talkType && !eventName && travelType){
    return travelDistance(travelType, false, true) + type3[talkType]+ location(eventLocation) +'.';
  }else if(!inviteType && talkType && !eventName && !travelType){
    return type2[talkType]+ location(eventLocation) +'.';
  }else if(inviteType && talkType && !eventName){
    return 'I was '+invite[inviteType]+'  '+type[talkType] + location(eventLocation)+travelDistance(travelType)+'.';
  }else if(inviteType && !talkType && !eventName){
    return 'I was '+invite[inviteType]+' to speak' + location(eventLocation)+travelDistance(travelType)+'.';
  }else if(inviteType && !talkType && eventName){
    return 'I was '+invite[inviteType]+' to speak at ' + eventName + location(eventLocation)+travelDistance(travelType)+'.';
  }else{
    return '';
  }

}

function travelDistance(travelType, separateSentence, separateSentence2){
  var type ={
    international:', so I made an international trip to speak',
    domestic:', so I made a domestic travel to speak',
    local:'. This was a local event'
  };
  var type2 ={
    international:' I made an international trip to speak',
    domestic:' I made a domestic travel to speak',
    local:' I attended a local event'
  };
  var type3 ={
    international:'I made an international trip',
    domestic:'I made a domestic travel',
    local:'I attended a local event'
  };
  if(travelType && separateSentence){
    return type2[travelType];
  }else if(travelType && separateSentence2){
    return type3[travelType];
  }else if(travelType){
    return type[travelType];
  }
  return'';
}

function speakerBenefits(ticketType, fee, currency){
  var ticket ={
    free: 'The event gave me free ticket',
    discount:'The event gave me discounted ticket to buy',
    fullprice:'The event asked me to but ticket in full price'
  };
  if(ticketType && fee){
    if(fee === '0'){
      return ticket[ticketType] + ', and I was not paid to speak.';
    }else{
      return ticket[ticketType] + ', and I was paid ' + fee +' '+ currency + ' to speak.';
    }
  }else if(!ticketType && fee){
    if(fee === '0'){
      return 'I was not paid to speak.';
    }else{
      return 'I was paid ' + fee +' '+ currency + ' to speak.';
    }
  }else if(ticketType && !fee){
    return ticket[ticketType] +'.';
  }else{
    return null;
  }
}


function speakerTravel(travelAssistance){
  var assistance ={
    full:'All of my travel and accommodation were covered by the event.',
    partial: 'The event assisted part of my travel and accommodation.',
    none:'The event did not pay for my travel and accommodation.'
  };
  if(travelAssistance){
    return assistance[travelAssistance];
  }
  return null;
}

function employer(travelAssistance, timeOff){
  var assistance ={
    full:'paid all of',
    partial: 'paid some of',
    none:'did not pay'
  };
  var off = {
    working:'I was working while speaking at the event.',
    paid_timeoff:'I used my PTO to speak.',
    unpaid_timeoff:'I took unpaid time off to speak.'
  };
  if(travelAssistance && timeOff){
    return 'My employer '+ assistance[travelAssistance] +' my travel expenses, and '+ off[timeOff];
  }else if(!travelAssistance && timeOff){
    return off[timeOff];
  }else if(travelAssistance && !timeOff){
    return 'My employer '+ assistance[travelAssistance] +' my travel expenses.';
  }else{
    return null;
  }
}

function experience(exp, singleSentence){
  if(exp && singleSentence){
    return 'I had a '+ exp +' time.';
  }else if(exp){
    return ', and I had a '+ exp +' time';
  }
  return null;
}

function timeCommitment(speakingSlot, speakingSlotUnit, prepTime, prepTimeUnit, exp){
  if(speakingSlot && prepTime){
    return 'It took me ' +prepTime+' '+checkSingular(prepTime, prepTimeUnit) + ' to prepare for my '+speakingSlot+' '+checkSingular(speakingSlot, speakingSlotUnit)+' speaking slot'+experience(exp)+'.';
  }else if(!speakingSlot && prepTime){
    return 'It took me ' +prepTime+' '+checkSingular(prepTime, prepTimeUnit) + ' to prepare for this event'+experience(exp)+'.';
  }else if(speakingSlot && !prepTime){
    return 'My speaking slot was '+speakingSlot+' '+checkSingular(speakingSlot, speakingSlotUnit)+' for this event'+experience(exp)+'.';
  }else{
    return experience(exp, true);
  }
}

function aboutSpeaker(gender, speakingYears, unit){
  if(speakingYears){
    return "I'm a "+gender+' who has been speaking for '+ speakingYears + ' ' + checkSingular(speakingYears, unit)+'.';
  }
  return null;
}

function also(additionalInfo){
  if(additionalInfo){
    return 'Also, '+ additionalInfo;
  }
  return null;
}

function generate(data){
  return [
    eventDetail(data.invite_type, data.talk_type, data.event_name, data.event_location,data.travel_type),
    speakerBenefits(data.ticket_type, data.fee, data.currency),
    speakerTravel(data.travel_assistance),
    employer(data.travel_assistance_by_employer, data.time_off),
    timeCommitment(data.speaking_slot, data.speaking_slot_unit, data.prep_time, data.prep_time_unit,data.experience),
    aboutSpeaker(data.gender, data.speaking_years, data.speaking_years_unit),
    also(data.additional_info)
  ].filter(function(n){ return n !== null; });
}

exports.generate = generate;