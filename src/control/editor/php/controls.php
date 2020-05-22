<!-- Slide status labels -->
<div id="slide-label-readonly">
	Sie können diese Folie nicht bearbeiten.
</div>
<div id="slide-label-edited">
	Sie können diese Folie nicht bearbeiten, da sie bereits von jemand anderem verwendet wird.
</div>
<div id="slide-label-collaborate">
	Sie dürfen diese Folie als Kollaborateur bearbeiten.
</div>
<div id="slide-label-no-quota">
	Sie dürfen keine weiteren Folien erstellen, da die Folienbegrenzung erreicht wurde.
</div>

<!-- Slide name input -->
<div class="form-group" id="slide-name-group">
	<label for="slide-name">Name</label>
	<input type="text"
		class="form-control w-100"
		id="slide-name"
		data-toggle="tooltip"
		title="The name of the slide. This is only visible in the editor.">
	<div class="invalid-feedback"></div>
</div>

<!-- Slide owner label -->
<div class="form-group" id="slide-owner-group">
	<label for="slide-owner">Besitzer</label>
	<input type="text"
		class="form-control w-100"
		id="slide-owner"
		data-toggle="tooltip"
		title="The owner of the slide."
		disabled>
</div>

<!-- Slide collaborators multiselect -->
<div class="form-group" id="slide-collab-group">
	<label for="slide-collab">
		Kollaborateure
	</label>
</div>

<!-- Slide duration selector -->
<div class="form-group" id="slide-duration-group">
	<label for="slide-duration">Anzeigedauer (Sekunden)</label>
	<input type="number" class="form-control w-100"
		id="slide-duration"
		data-toggle="tooltip"
		title="Anzeigedauer der Folie in Sekunden.">
	</input>
	<div class="invalid-feedback"></div>
</div>

<!-- Slide index input -->
<div class="form-group" id="slide-index-group">
	<label for="slide-index">Position</label>
	<input type="number"
		min="0"
		class="form-control w-100"
		id="slide-index"
		data-toggle="tooltip"
		title="Die Position der Folie in Zahlen. 0 ist die erste Folie">
	<div class="invalid-feedback"></div>
</div>

<!-- Slide animation selector -->
<div class="form-group" id="slide-animation-group">
	<label for="slide-animation">Animation</label>
	<select class="custom-select w-100"
		id="slide-animation"
		data-toggle="tooltip"
		title="Slide transition animation.">
		<option value="0">Keine Animation</option>
		<option value="1">Nach links wischen</option>
		<option value="2">Nach Rechts wischen</option>
		<option value="3">Nach oben wischen</option>
		<option value="4">Nach unten wischen</option>
	</select>
</div>

<!-- Schedule enable -->
<div class="form-group mb-0">
	<a class="link-nostyle"
		data-toggle="collapse"
		href="#slide-sched-group"
		aria-expanded="false"
		aria-controls="slide-sched-group">
		<i class="fas fa-angle-right"></i> Folienplanung
	</a>
</div>

<!-- Schedule date/time selector -->
<div class="row form-group collapse" id="slide-sched-group">
	<div class="col-12 py-1">
		<input type="checkbox"
			id="slide-schedule-enable"
			data-toggle="tooltip"
			title="Auswählen, ob für die Folie eine Folienplanung angelegt werden soll.">
		<label class="form-check-label" for="slide-sched">
			Aktiv
		</label>
	</div>
	<div class="col-12 py-1">
		<label for="slide-sched-date-s">
			Startdatum
		</label>
		<input type="date"
			id="slide-sched-date-s"
			class="form-control d-inline"
			data-toggle="tooltip"
			title="Das Startdatum der Folienplanung.">
	</div>
	<div class="col-12 py-1">
		<input type="time"
			id="slide-sched-time-s"
			class="form-control d-inline"
			data-toggle="tooltip"
			title="Die Startzeit der Folienplanung."
			step="1">
	</div>
	<div class="col-12 py-1">
		<label for="slide-sched-date-e">
			Enddatum
		</label>
		<input type="date"
			id="slide-sched-date-e"
			class="form-control d-inline"
			data-toggle="tooltip"
			title="Das Enddatum der Folienplanung.">
	</div>
	<div class="col-12 py-1">
		<input type="time"
			id="slide-sched-time-e"
			class="form-control d-inline"
			data-toggle="tooltip"
			title="Die Endzeit der Folienplanung."
			step="1">
	</div>
</div>

<!-- Slide enabled checkbox -->
<div class="form-group mt-3" id="slide-enabled-group">
	<input type="checkbox"
		id="slide-enable"
		data-toggle="tooltip"
		title="Auswählen, ob die Folie aktiv ist.">
	<label class="form-check-label"
		for="slide-enabled">
		Folie aktiv
	</label>
</div>
