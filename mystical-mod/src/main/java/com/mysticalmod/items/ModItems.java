package com.mysticalmod.items;

import com.mysticalmod.MysticalMod;
import com.mysticalmod.items.tools.ModTools;
import net.minecraft.world.item.Item;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

public class ModItems {
    public static final DeferredRegister<Item> ITEMS = 
        DeferredRegister.create(ForgeRegistries.ITEMS, MysticalMod.MOD_ID);

    public static final RegistryObject<Item> MYSTICAL_GEM = ITEMS.register("mystical_gem",
        () -> new Item(new Item.Properties().stacksTo(64)));

    public static final RegistryObject<Item> RAW_MYSTICAL_ORE = ITEMS.register("raw_mystical_ore",
        () -> new Item(new Item.Properties().stacksTo(64)));

    public static final RegistryObject<Item> MYSTICAL_INGOT = ITEMS.register("mystical_ingot",
        () -> new Item(new Item.Properties().stacksTo(64)));

    public static final RegistryObject<Item> MAGIC_ESSENCE = ITEMS.register("magic_essence",
        () -> new Item(new Item.Properties().stacksTo(64)));

    public static final RegistryObject<Item> MYSTICAL_STICK = ITEMS.register("mystical_stick",
        () -> new Item(new Item.Properties().stacksTo(64)));

    public static final RegistryObject<Item> ENCHANTED_BOOK_FRAGMENT = ITEMS.register("enchanted_book_fragment",
        () -> new Item(new Item.Properties().stacksTo(16)));

    public static final RegistryObject<Item> MAGIC_DUST = ITEMS.register("magic_dust",
        () -> new Item(new Item.Properties().stacksTo(64)));

    public static final RegistryObject<Item> MYSTICAL_SWORD = ModTools.registerSword();
    public static final RegistryObject<Item> MYSTICAL_PICKAXE = ModTools.registerPickaxe();
    public static final RegistryObject<Item> MYSTICAL_AXE = ModTools.registerAxe();
    public static final RegistryObject<Item> MYSTICAL_SHOVEL = ModTools.registerShovel();
    public static final RegistryObject<Item> MYSTICAL_HOE = ModTools.registerHoe();

    public static final RegistryObject<Item> MYSTICAL_HELMET = ModTools.registerHelmet();
    public static final RegistryObject<Item> MYSTICAL_CHESTPLATE = ModTools.registerChestplate();
    public static final RegistryObject<Item> MYSTICAL_LEGGINGS = ModTools.registerLeggings();
    public static final RegistryObject<Item> MYSTICAL_BOOTS = ModTools.registerBoots();

    public static final RegistryObject<Item> MAGIC_WAND = ITEMS.register("magic_wand",
        () -> new Item(new Item.Properties().stacksTo(1).durability(500)));

    public static final RegistryObject<Item> MYSTICAL_APPLE = ITEMS.register("mystical_apple",
        () -> new Item(new Item.Properties().stacksTo(16).food(
            new net.minecraft.world.food.FoodProperties.Builder()
                .nutrition(8)
                .saturationMod(1.2F)
                .alwaysEat()
                .build())));
}
