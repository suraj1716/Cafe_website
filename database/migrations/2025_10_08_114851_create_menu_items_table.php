<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('menu_items', function (Blueprint $table) {
        $table->id();
        $table->foreignId('category_id')
              ->nullable()
              ->constrained('categories')
              ->nullOnDelete();
        $table->string('name');
        $table->text('description')->nullable();
        $table->string('size')->nullable(); // e.g. Small, Medium, Large
        $table->decimal('price', 8, 2);
        $table->string('image')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};
