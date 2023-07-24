<template>
	<header class="header container">
		<div class="header__wrapper">
			<span class="header__info">Каталог</span>
			<NuxtLink to="/" class="header__logo">
				<img src="img/site-logo.webp" alt="Логотип Рик и Морти" width="116" height="34" />
			</NuxtLink>
			<a class="header__tel" href="tel:8 800 600 90 09"> 8 800 600 90 09 </a>
			<NuxtLink to="/cart" class="header__cart" href="cart.html" aria-label="Корзина с товарами">
				<svg width="19" height="24">
					<use xlink:href="#icon-cart"></use>
				</svg>
				<span class="header__count" aria-label="Количество товаров">3</span>
			</NuxtLink>
		</div>
	</header>
</template>
