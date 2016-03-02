
	function BitrixArea(id, nameRus, nameEng){
		this.id = id;
		this.nameRus = nameRus;
		this.nameEng = nameEng;
	}
	BitrixArea.prototype.minGrade = 0;
	BitrixArea.prototype.maxGrade = 10;
	

	var bitrixAreas = [
		new BitrixArea("design", "Дизайн", "Design"),
		new BitrixArea("tech", "Технологии", "Technologies"),
		new BitrixArea("adm", "Администрирование", "Administration"),
		new BitrixArea("complex", "Комплексный компонент", "Complex Component"),
		new BitrixArea("cache", "Кеширование", "Cache"),
		new BitrixArea("simple", "Простой компонент", "Simple Component"),
		new BitrixArea("handlers", "Обработчики", "Handlers"),
		new BitrixArea("agents", "Агенты", "Agents"),
	];


	function BitrixAreaResult(areaId, mark){
		this.areaId = areaId;
		this.mark = mark;
	}

	var bitrixResult = [
		new BitrixArea("design", 8),
		new BitrixArea("tech", 6),
		new BitrixArea("adm", 7),
		new BitrixArea("complex", 5),
		new BitrixArea("cache", 5),
		new BitrixArea("simple", 9),
		new BitrixArea("handlers", 8),
		new BitrixArea("agents", 4)
	];

	function Exam(id, devName, companyName, examDate, areaResults){
		this.id = id;
		this.devName = devName;
		this.companyName = companyName;
		this.examDate = examDate;
		this.areaResults = areaResults;
	}

	var examPassed = new Exam(
		1234567, "Ася Петрова", "Микросайт", "29.02.2016",
		bitrixResult
	);

	//console.log(bitrixResult);
	//console.log(examPassed);

	console.log(bitrixAreas);

	var axisLength = 200;
	var zeroPointDim = 10;
	var captionDeltaX = 80;
	var captionDeltaY = 50;

	var zeroX = document.querySelector("#main").offsetWidth/2;
	var zeroY = document.querySelector("#main").offsetHeight/2;
	
	var zeroPoint = document.createElement("div");
	zeroPoint.className="zero";
	zeroPoint.style.left = (zeroX-zeroPointDim/2)+"px";
	zeroPoint.style.top = (zeroY-zeroPointDim/2)+"px";
	zeroPoint.style.width = zeroPointDim+"px";
	zeroPoint.style.height = zeroPointDim+"px";
	zeroPoint.style.borderRadius = (zeroPointDim/2)+"px";
	document.querySelector("#main").appendChild(zeroPoint);


	for(var i=0;i<bitrixAreas.length;i++){
		var newDivContainer = document.createElement("div");
		document.querySelector("#main").appendChild(newDivContainer);

		var newDiv = document.createElement("div");
		newDiv.className = "axis";
		newDiv.style.width = axisLength+"px";
		newDiv.style.left = (zeroX-axisLength/2+axisLength*Math.cos(-Math.PI*2*i/bitrixAreas.length)/2)+"px";
		newDiv.style.top = (zeroY+axisLength*Math.sin(-Math.PI*2*i/bitrixAreas.length)/2)+"px";	
		newDiv.style.transform = "rotate("+(-360*i/bitrixAreas.length)+"deg)";
		newDivContainer.appendChild(newDiv);

		for(var j=bitrixAreas[i].minGrade+2;j<=bitrixAreas[i].maxGrade;j=j+2){
			var newScalePointDiv = document.createElement("div");
			newScalePointDiv.className = "axis-scale-points";
			newScalePointDiv.textContent  = j;
			var delta = (axisLength)/(bitrixAreas[i].maxGrade-bitrixAreas[i].minGrade);
			newScalePointDiv.style.left = (zeroX +j*delta*Math.cos(Math.PI*2*i/bitrixAreas.length))+"px";
			newScalePointDiv.style.top = (zeroY -j*delta*Math.sin(Math.PI*2*i/bitrixAreas.length))+"px";	
			newDivContainer.appendChild(newScalePointDiv);
		}

		var newCaptionDiv = document.createElement("span");
		newCaptionDiv.className = "area-name";
		newCaptionDiv.textContent  = bitrixAreas[i].nameRus;
		newCaptionDiv.style.left = (zeroX+(axisLength+captionDeltaX)*Math.cos(-Math.PI*2*i/bitrixAreas.length))+"px";
		newCaptionDiv.style.top = (zeroY+(axisLength+captionDeltaY)*Math.sin(-Math.PI*2*i/bitrixAreas.length))+"px";			
		newDivContainer.appendChild(newCaptionDiv);

	}
