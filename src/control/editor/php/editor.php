<div class="col-md container-fluid">
	<div class="row py-2">


		<div class="col-12 container-fluid">
			<a class="link-nostyle"
				data-toggle="collapse"
				href="#slide-input-collapse"
				aria-expanded="true"
				aria-controls="slide-input-collapse">
				<i class="fas fa-angle-right"></i> Markup
			</a>
			<div id="slide-input-collapse" class="row collapse">
				<div class="col-12 text-center">
				</div>
				<div class="col-12">
						<div id="slide-input" class="rounded"></div>
				</div>
			</div>
		</div>



		<!-- Editor toolbar -->
		<div class="col-10 text-right">
			<div class="dropdown">
				<button id="editor-dropdown-menu-btn"
						class="btn btn-info small-btn dropdown-toggle"
						type="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false">
					Menü
				</button>

				<div class="dropdown-menu" aria-labelledby="editor-dropdown-menu-btn">
					<button type="button"
						class="dropdown-item"
						id="btn-add-media">
						Datei hochladen
					</button>
					<button type="button"
						class="dropdown-item"
						id="btn-quick-help">
						Hilfe
					</button>
				</div>
			</div>

		</div>
	</div>

	<button id="btn-medien-hinzufügen"
			class="btn btn-primary btn-lg"
			type="button"
			aria-haspopup="true"
			aria-expanded="false">
		Medien hinzufügen
	</button>

	<div class="container-fluid">
		<p id="slide-label-editor-error"></p>
	</div>
</div>
