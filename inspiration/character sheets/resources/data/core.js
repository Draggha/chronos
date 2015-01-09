datastorage.createDot("Attributes", "Mental", 1, ['attrRes', 'attrWit', 'attrInt'])
	.createDot("Attributes", "Physical", 1, ['attrSta', 'attrDex', 'attrStr'])
	.createDot("Attributes", "Social", 1, ['attrCom', 'attrMan', 'attrPre'])

	.createDot("Skills", "Mental", 0, ['skAca', 'skCom', 'skCra', 'skInv', 'skMed', 'skOcc', 'skPol', 'skSci'])
	.createDot("Skills", "Physical", 0, ['skAth', 'skBra', 'skDri', 'skFir', 'skLar', 'skSte', 'skSur', 'skWea'])
	.createDot("Skills", "Social", 0, ['skAK', 'skEmp', 'skExp', 'skInt', 'skPer', 'skSoc', 'skStr', 'skSub']);

datastorage.Tooltips.addTooltips({
	id: ["attrInt1", "attrWit1", "attrRes1", "attrStr1", "attrDex1", "attrSta1", 
		"attrPre1","attrMan1","attrCom1"],
	data: "Poor"
},
{
	id: ["attrInt2", "attrWit2", "attrRes2", "attrStr2", "attrDex2", "attrSta2", 
		"attrPre2","attrMan2","attrCom2"],
	data: "Normal"
},
{
	id: ["attrInt3", "attrWit3", "attrRes3", "attrStr3", "attrDex3", "attrSta3", 
		"attrPre3","attrMan3","attrCom3"],
	data: "Good"
},
{
	id: ["attrInt4", "attrWit4", "attrRes4", "attrStr4", "attrDex4", "attrSta4", 
		"attrPre4","attrMan4","attrCom4"],
	data: "Exceptional"
},
{
	id: ["attrInt5", "attrWit5", "attrRes5", "attrStr5", "attrDex5", "attrSta5", 
		"attrPre5","attrMan5","attrCom5"],
	data: "Genius"
});