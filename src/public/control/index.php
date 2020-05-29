<?php
	require_once($_SERVER['DOCUMENT_ROOT'].'/../common/php/Config.php');

	use libresignage\common\php\Config;
	use libresignage\common\php\CSS;
	use libresignage\common\php\auth\Auth;

	Auth::web_auth(NULL, NULL, TRUE);
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="/control/css/control.css">
		<?php require_once(Config::config('LIBRESIGNAGE_ROOT').'/common/php/favicon.php'); ?>
		<title>LibreSignage Kontrollpanel</title>
	</head>
	<body>
		<?php require_once(Config::config('LIBRESIGNAGE_ROOT').Config::config('NAV_PATH')); ?>
		<main class="container-fluid">
			<div class="row container-fluid mx-auto">
				<div class="col-md-12 header-col">
					<h1>Willkommen bei DHBW LibreSignage!</h1>
				</div>
			</div>
			<div class="row ctrl-panel-row container-fluid">
				<div class="col-md-6 ctrl-panel-col">
					<h4>Beschränkungen</h4>
					<div id="user-quota-cont">
					</div>
				</div>
				<div class="col-md-6 ctrl-panel-col cont-info-primary">
					<h4>Probleme mit LibreSignage?</h4>
					<p>Diese Installation von LibreSignage
					wird gepflegt von <?php echo Config::config('ADMIN_NAME'); ?>.
					Wenn Sie Probleme bei der Benutzung von
					LibreSignage haben, kontaktieren Sie bitte den Admin unter: 
					<a href="mailto: <?php echo Config::config('ADMIN_EMAIL'); ?>">
					<?php echo Config::config('ADMIN_EMAIL'); ?></a>.</p>
				</div>
			</div>
		</main>
		<?php require_once(Config::config('LIBRESIGNAGE_ROOT').Config::config('FOOTER_PATH')); ?>
		<script src="/control/js/main.js"></script>
	</body>
</html>
