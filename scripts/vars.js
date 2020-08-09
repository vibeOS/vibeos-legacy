softid_vars = {
	code: "PuB",
	version: "2.0",
	clyear: "2020"
}

softid_codestr = {
	PrD: "Private Development",
	PrB1: "Private Beta 1",
	PrB2: "Private Beta 2",
	PuB: "Public Beta",
	PuPre: "Public Pre-Release",
	Pure: "Public Release"
}

//this is is fucking terrible and doesnt account for newer codes
//but whatever
switch(softid_vars.code){
	case "PrD": softid_codestr_useable = softid_codestr.PrD;
	case "PrB1": softid_codestr_useable = softid_codestr.PrB1;
	case "PrB2": softid_codestr_useable = softid_codestr.PrB2;
	case "PuB": softid_codestr_useable = softid_codestr.PuB;
	case "PuPre": softid_codestr_useable = softid_codestr.PuPre;
	case "Pure": softid_codestr_useable = softid_codestr.Pure;
}

softid_full = `vibeOS ${softid_codestr_useable}\nCL vibeOS Development Group ${softid_vars.clyear}\nvibeOS is Open Source Software`;
