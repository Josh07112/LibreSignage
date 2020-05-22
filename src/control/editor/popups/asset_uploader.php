<!-- Asset uploader popup for the LibreSignage editor. -->
<div id="asset-uploader" class="popup">
	<div class="row header-row">
		<div class="col">
			<h1>Medien hinzufügen</h1>
		</div>
	</div>
	<div class="row filesel-row">
		<div class="col-sm filesel-cont h-auto">
			<input type="file"
					class="custom-file-input filesel"
					id="asset-uploader-filesel"
					multiple>
			<label class="custom-file-label filesel-label"
					for="asset-uploader-filesel">
				Datei auswählen...
			</label>
			<div class="invalid-feedback"></div>
		</div>
		<div class="col-sm-auto h-auto">
			<button type="button" class="btn btn-primary upload-btn">
				<span class="on-active">Hochladen</span>
				<i class="fas fa-upload on-active"></i>

				<span class="on-upload">Wird hochgeladen... </span>
				<i class="fas fa-spinner fa-spin on-upload"></i>
			</button>
		</div>
	</div>
	<div class="row file-limit-label-row">
		<div class="col file-limit-label-col">
			Die Maximale Anzahl an Medien wurde hochgeladen.
			Es können keine weiteren Dateien für diese Folie hochgeladen werden.
		</div>
	</div>
	<div class="row filelist-row">
		<div class="col filelist"></div>
	</div>
	<div class="row file-link-row">
		<div class="col">
			<label for="asset-uploader-file-link-input">Link</label>
			<input type="text"
					class="form-control file-link-input"
					id="asset-uploader-file-link-input">

				<button id="btn-media-save"
					type="button"
					class="btn btn-primary"
					data-toggle="tooltip"
					title="Bild in Folie speichern.">
					<span class="on-active">Speichern</span>
					<i class="fas on-active"></i>
				</button>

		</div>
	</div>
</div>
